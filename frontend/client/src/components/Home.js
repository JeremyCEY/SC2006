//Home.js
import homeImage from "../images/home.png"
import Explore from "./Explore";
import LoggedOutNavbar from "./LoggedOutNavbar";
import Map from './Map'

function Home(){
    return(
        <>
            <LoggedOutNavbar/>
            <div className="flex flex-col items-center">
                <div className="relative pt-10 pb-10 ">
                    <img src={homeImage} className="w-full" alt="Home"/>
                    
                    <div className="absolute 
                                top-1/2 left-1/2 
                                transform -translate-x-1/2 -translate-y-1/2 
                                text-center text-white 
                                bg-black bg-opacity-30 p-5 rounded">
                        <h2 className="text-3xl font-bold pb-2">Disover through Amenities</h2>
                        <p className="text-base">Your dream home location should cater to your lifestyle. Find homes near Gyms, Schools, Shopping Centres, new MRT lines, and more...</p>
                    </div>
                </div>
                
                <div>
                    <h2 className="font-bold text-3xl">Explore Residences</h2>
                    {/* will be a module itself */}
                    <div className="items-center">
                        <Map/>
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default Home