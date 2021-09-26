import React from 'react';
import styled from 'styled-components';

const VclipStyles = styled.section`
    .clip_container {
        display: flex;
        padding: 1rem 1rem 1rem 0;
        margin: 2rem 2rem 2rem 0;
        img {
            flex: 1;
            margin-right: 0.5rem;
        }
        .context_info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            h4 {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
`;

const Vclip = ({ title, thumbnail, url, datetime }) => {
    const date = datetime.slice(0, 10)
    return (
        <VclipStyles>
            <a className="clip_container" href={url} target="_blank" rel="noopener noreferrer">
                <img src={thumbnail} alt="thumbnail" />
                <div className="context_info">
                    <h4>{title}</h4>
                    <p>{date}</p>
                </div>
            </a>
        </VclipStyles>
    );
};

export default Vclip;