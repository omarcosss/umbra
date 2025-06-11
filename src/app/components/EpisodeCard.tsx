import { CheckIcon } from '@phosphor-icons/react';
import './EpisodeCardStyles.scss';
import React from 'react';


const EpisodeCard = (index: number) => {
    return (
        <div className="episode-card">
            <img src={`https://placehold.co/300x170?text=Episódio+${index + 1}`} alt="Episódio" />
            <div className="episode-card-info">
                <span className="episode-card-title">Episódio {index + 1}</span>
                <span className="episode-card-check"><CheckIcon /></span>
            </div>
        </div>
    );
};

export default EpisodeCard;