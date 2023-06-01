import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './DonationPage.css';
import Uploaimagetest from "../core/Uploaimagetest";
import {getAnnouncementWithId} from "../../api/DonationAnnouncementAPI";
import {postImage} from "../../api/ImageAPI";
import {postDonation} from "../../api/DonationAPI";

const AnnouncementDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const userType = localStorage.getItem('userType');

    const isMounted = useRef(false);

    const [announcement, setAnnouncement] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No selected file");

    const [donation, setDonation] = useState({
        quantity: null,
        announcementId: Number(id),
        itemTitle: null,
        itemSummary: null,
        itemImageId: null
    });

    const [callback, setCallback] = useState(false);

    const calculateDonationProgress = (currentQuantity, targetQuantity) => {
        const percentage = (currentQuantity / targetQuantity) * 100;
        return Math.round(percentage);
    };

    const handleDonateClick = (event) => {
        event.preventDefault();

        postImage(image)
            .then((response) => {
                setData({...donation, itemImageId: response.data});
                console.log("DATA: ", data);
            })
            .catch((error) => {
                alert(error.response.data);
            });
    };

    const sendDonateRequest = () => {
        postDonation(data)
            .then((response) => {
                navigate('/announcements');
            }).catch((error) => {
                alert(error.response.data);
            });
    }

    useEffect(() => {
        getAnnouncementWithId(id)
            .then((response) => {
                setAnnouncement(response.data);
                setLoading(false);
            }).catch((error) => {
            alert(error.response.data);
        });
    }, [callback]);

    useEffect(() => {
        if (isMounted.current) {
            sendDonateRequest();
        } else {
            isMounted.current = true;
        }
    }, [data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="announcement-details">
            <div className="announcement-first-main-container">
                <div className="announcement-first-sub-container">
                    <div className="announcement-main-image-container">
                        <img src={`../img/organization.jpg`} alt="Announcement"/>
                    </div>
                </div>
                <div className="announcement-second-sub-container">
                    <h2>{announcement.title}</h2>
                    <p>{announcement.description}</p>
                    <p>Organization: {announcement.organization}</p>
                    <p>Category: {announcement.category}</p>
                    <p>
                        Donated: {announcement.quantityCollected}/{announcement.quantityNeeded}
                    </p>
                    <div className="donation-progress">
                        <div
                            className="donation-progress-bar"
                            style={{ width: `${calculateDonationProgress(announcement.quantityCollected, announcement.quantityNeeded)}%` }}
                        >
                            {calculateDonationProgress(announcement.quantityCollected, announcement.quantityNeeded)}%
                        </div>
                    </div>
                </div>
            </div>
            {userType === "USER" ? (
                <form className="announcement-second-main-container" onSubmit={handleDonateClick}>
                    <h2>Add Donation</h2>
                    <div className="announcement-second-first-sub-container">
                        <div className="announcement-second-details">
                            <label>
                                Product Name:
                                <input
                                    type="text"
                                    value={donation.itemTitle}
                                    onChange={(e) => {setDonation({...donation, itemTitle: e.target.value})}}
                                />
                            </label>
                            <label>
                                Product Description:
                                <input
                                    type="text"
                                    value={donation.itemSummary}
                                    onChange={(e) => {setDonation({...donation, itemSummary: e.target.value})}}
                                />
                            </label>
                            <label>
                                Quantity to Donate:
                                <input
                                    type="number"
                                    value={donation.quantity}
                                    onChange={(e) => {setDonation({...donation, quantity: e.target.value})}}
                                    min={1}
                                    max={announcement.quantityNeeded - announcement.quantityCollected}
                                />
                            </label>
                        </div>
                        <div className="announcement-second-image">
                            <label className="upload-image-label">
                                <Uploaimagetest image={image} setImage={setImage} fileName={fileName} setFileName={setFileName}/>
                            </label>
                        </div>
                    </div>
                    <div className="announcement-second-second-sub-container">
                        <button type="submit">Donate</button>
                    </div>
                </form>
            ) : (
                <div></div>
            )}

        </div>
    );
};

export default AnnouncementDetails;