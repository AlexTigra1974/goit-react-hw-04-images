import { useEffect, useState } from 'react';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { FetchApi } from 'servises/pixabayAPI';
import { toast, ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from 'components/Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

// export class App extends Component {
//   state = {
//     searchText: '',
//     hits: [],
//     page: 1,
//     totalHits: 0,
//     largeImage: '',
//     loading: false,
//     showModal: false,
//   };

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const createSearchText = searchText => {
    setSearchText(searchText);
    setImages([]);
    setPage(1);
  };

  const createLargeImage = largeImageURL => {
    setLargeImage(largeImageURL);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    if (searchText === '') {
      return;
    }

    const FetchImages = async () => {
      try {
        setLoading(true);
        setTotalHits(0);
        const { hits, totalHits } = await FetchApi(searchText, page);
        // console.log(hits);
        // console.log(totalHits);
        setImages(images => [...images, ...hits]);
        setTotalHits(totalHits);
      } catch (err) {
        console.log(err);
        toast('Something went wrong...');
        setLoading({ loading: false });
      } finally {
        setLoading({ loading: false });
      }
    };

    FetchImages();
  }, [searchText, page]);

  return (
    <div className={css.App}>
      <Searchbar createSearchText={createSearchText} />

      <ImageGallery hits={images} createLargeImage={createLargeImage} />

      {showModal && <Modal largeImageURL={largeImage} onClick={toggleModal} />}

      {loading && <Loader />}
      {totalHits > 12 && <Button onClick={onLoadMore} />}
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
    </div>
  );
};

// componentDidUpdate(_, prevState) {
//   if (
//     prevState.searchText !== this.state.searchText ||
//     prevState.page !== this.state.page
//   ) {
//     // fetch()
//     this.FetchImages();
//     // console.log(prevState.searchText);
//     // console.log(this.state.searchText);
//   }
// }
// FetchImages = async () => {
//   const { searchText, page } = this.state;
//   this.setState({ loading: true, totalHits: 0 });
//   try {
//     const { hits, totalHits } = await FetchApi(searchText, page);
//     // console.log(hits);
//     // console.log(totalHits);

//     this.setState(() => ({
//       hits: [...this.state.hits, ...hits],
//       totalHits: totalHits,
//     }));
//   } catch (err) {
//     console.log(err);
//     toast('Something went wrong...');
//     this.setState({ loading: false });
//   } finally {
//     this.setState({ loading: false });
//   }
// };

// handleFormSubmit = search => {
//   console.log(search);
//   this.setState({ search});
// };

// createSearchText = searchText => {
//   this.setState({ searchText, hits: [], page: 1 });
// };

// onLoadMore = () => {
//   this.setState(({ page }) => ({
//     page: page + 1,
//   }));
// };

// createLargeImage = largeImageURL => {
//   console.log(largeImageURL);
//   this.setState({ largeImage: largeImageURL, showModal: true });
// };

// toggleModal = () => {
//   this.setState(({ showModal }) => ({
//     showModal: !showModal,
//   }));
// };

// render() {
//   const { hits, totalHits, largeImage, showModal, loading } = this.state;
//   const { createSearchText, onLoadMore, createLargeImage, toggleModal } =
//     this;

//   return (
//     <div className={css.App}>
//       <Searchbar createSearchText={createSearchText} />

//       <ImageGallery hits={hits} createLargeImage={createLargeImage} />

//       {showModal && (
//         <Modal largeImageURL={largeImage} onClick={toggleModal} />
//       )}

//       {loading && <Loader />}
//       {totalHits > 12 && <Button onClick={onLoadMore} />}
//       <ToastContainer position="top-center" autoClose={3000} theme="light" />
//     </div>
//   );
// }
