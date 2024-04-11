import React, { useEffect, useState } from "react";
import { Layout, Button, List, Select, ConfigProvider, message } from 'antd';
import { FilterOutlined, ArrowUpOutlined, ArrowDownOutlined, LeftOutlined, RightOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';

const { Sider } = Layout;

function SearchResultsBar({ setSortOption, sortedData, handleDivClick, userId }) {
    const [collapsed, setCollapsed] = useState(false);
    const [bookmarked, setBookmarked] = useState({}); 
    


    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const [userID, setUserID] = useState(null); // State for user ID


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserID(decodedToken.id); // Set user ID from decoded token
        }
    }, []); // Empty dependency array to run only once on component mount


    // Heart icon to bookmark ------------
    const handleBookmarkClick = async (propertyId) => {
        const token = localStorage.getItem('token');
        const isCurrentlyBookmarked = bookmarked[propertyId];  
    
        setBookmarked({
            ...bookmarked,
            [propertyId]: !isCurrentlyBookmarked,
        });
    
        try {
            const method = isCurrentlyBookmarked ? 'DELETE' : 'POST';
    
            const url = `http://localhost:3000/bookmark/${userID}/${propertyId}`;
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                ...(method === 'POST' && { body: JSON.stringify({ propertyId: propertyId }) }),
            });
    
            if (!response.ok) {
                setBookmarked({
                    ...bookmarked,
                    [propertyId]: isCurrentlyBookmarked,
                });
                throw new Error(`HTTP error: ${response.status}`);
            }
    
            const action = isCurrentlyBookmarked ? 'removed' : 'added';
            message.success(`Bookmark ${action}.`);
        } catch (error) {
            console.error('Error updating bookmark:', error);
            setBookmarked({
                ...bookmarked,
                [propertyId]: isCurrentlyBookmarked,
            });
            message.error('Failed to update the bookmark.');
        }
    };
   // ---------------- keeping heart red after bookmarked--------
    useEffect(() => {
        const fetchBookmarkedItems = async () => {
          const token = localStorage.getItem('token');
          if (token && userID) {
            try {
              const response = await fetch(`http://localhost:3000/bookmark/${userID}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch bookmarked items');
              }
      
              const bookmarkedItems = await response.json();
              const bookmarkedState = {};
      
              bookmarkedItems.forEach(item => {
                bookmarkedState[item] = true;
              });
      
              setBookmarked(bookmarkedState);
            } catch (error) {
              console.error('Error fetching bookmarked items:', error);
            }
          }
        };
      
        fetchBookmarkedItems();
      }, [userID]);

    return (
        <>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                collapsedWidth={0}
                width={500}
                trigger={null}
                style={{
                    position: 'absolute',
                    left: 0,
                    zIndex: 100,
                    height: '87vh',
                    backgroundColor: 'white',
                }}
            >
                <div className="justify-between flex mt-5 mb-5">
                    <span className="font-bold text-3xl ml-10">Search Results</span>
                    <Select
                        suffixIcon={<FilterOutlined />}
                        defaultValue="Sort By"
                        className="bg-white border-none text-black shadow-md mr-10"
                        onChange={setSortOption}
                    >
                        <Select.Option value="price up">Price <ArrowUpOutlined /></Select.Option>
                        <Select.Option value="price down">Price <ArrowDownOutlined /></Select.Option>
                        <Select.Option value="size up">Size <ArrowUpOutlined /></Select.Option>
                        <Select.Option value="size down">Size <ArrowDownOutlined /></Select.Option>
                    </Select>
                </div>

                <div className='h-[77vh] overflow-auto justify-center flex'>
                    <List
                        className='ml-4'
                        grid={{ column: 2 }}
                        dataSource={sortedData}
                        renderItem={property => {
                            console.log('Property:', property);  // Log the entire property object to inspect its structure

                            return (
                                
                            <List.Item>
                                <Button
                                    className="h-[20vh] w-[15vw] shadow-md bg-gray-50"
                                    key={property.id}    // i think should be property._Id but that gives undefined in database
                                    onClick={() => handleDivClick(property)}
                                >
                                    <div className="header">
                                        <div className="residence-name">{property.town}</div>
                                        <div className="price-range">${property.resale_price.toLocaleString()}</div>
                                    </div>
                                    <ul className="residence-details">
                                        <li>Type: {property.flat_type}</li>
                                        <li>Street: {property.street_name}</li>
                                        <li>Floor Area: {property.floor_area_sqm} sqm</li>
                                    </ul>
                                    <HeartOutlined
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            color: bookmarked[property.id] ? 'red' : 'gray',
                                            fontSize: '16px',
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBookmarkClick(property.id);}}   // if i use .id it works but _.id stores undefined
                                    />
                                </Button>
                            </List.Item>
                            )
                        }}
                    />
                </div>
            </Sider>

            <ConfigProvider wave={{ disabled: true }}>
                <Button
                    type="primary"
                    icon={collapsed ? <RightOutlined className='text-black'/> : <LeftOutlined className='text-black'/>}
                    onClick={toggleSidebar}
                    style={{
                        position: 'absolute',
                        left: collapsed ? 0 : '500px',
                        transition: 'left 0.2s ease',
                        zIndex: 10,
                        top: '50vh',
                        backgroundColor: 'white',
                        borderRadius: '0%',
                        height: '50px',
                        border: 'none',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                    }}
                />
            </ConfigProvider>
        </>
    );
}

export default SearchResultsBar;