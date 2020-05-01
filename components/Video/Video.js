import classNames from 'classnames';
import React, { useState } from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import getVideoID from 'get-video-id';
import Modal from 'react-bootstrap/Modal';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';

import PlayIcon from '@/static/images/play.svg';

import './Video.scss';

const Video = props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const videoID = getVideoID(props.video).id;

  let poster = props.poster
    ? props.poster
    : `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;

  return (
    <div className={classNames('Video', props.className)}>
      <button className="Video__playTrigger" onClick={handleShow}>
        <img src={poster} className="Video__thumbnail" />
        <PlayIcon className="Video__playIcon" />
      </button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton />
        <Modal.Body>
          <ResponsiveEmbed aspectRatio="16by9">
            <YouTubePlayer
              playing={show}
              url={props.video}
              controls
              width="100%"
              height="100%"
            />
          </ResponsiveEmbed>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Video;
