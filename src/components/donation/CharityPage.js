import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CharityPage = () => {
    const { charityName } = useParams();
    const [goodsNeeded, setGoodsNeeded] = useState(10);
    const [goodsDonated, setGoodsDonated] = useState(0);

    const handleDonate = () => {
        if (goodsNeeded > 0) {
            setGoodsNeeded(goodsNeeded - 1);
            setGoodsDonated(goodsDonated + 1);
        }
    };

    return (
        <div className="container">
            <h1>{charityName} Charity</h1>
            <div className="charity-details">
                <p>Goods Needed: {goodsNeeded}</p>
                <p>Goods Donated: {goodsDonated}</p>
                <button className="donate-button" onClick={handleDonate}>
                    Donate
                </button>
            </div>
        </div>
    );
};

export default CharityPage;
