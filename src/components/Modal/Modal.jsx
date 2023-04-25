import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, onClick, tags }) => {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        console.log('esc');
        onClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  // componentDidMount() {
  //   console.log('modal cdm');
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// handleKeyDown = e => {
//   if (e.code === 'Escape') {
//     console.log('esc');
//     this.props.onClick();
//   }
// };

// handleBackdropClick = e => {
//   if (e.currentTarget === e.target) {
//     this.props.onClick();
//   }
// };

// render() {
//   return createPortal(
//     <div className={css.Overlay} onClick={this.handleBackdropClick}>
//       <div className={css.Modal}>
//         <img src={this.props.largeImageURL} alt={this.props.tags} />
//       </div>
//     </div>,
//     modalRoot
//   );
// }
