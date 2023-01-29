import Modal from 'components/UI/Modal';
import CategoryForm from './CategoryForm';
import { useModal } from 'hooks/useStoreContext';

const CategoryFormModal = () => {
  const { isModalShow, setShowModal } = useModal();

  return (
    <>
      {isModalShow && (
        <Modal onCloseModalHandler={() => setShowModal(false)}>
          <h1 className="mb-4 font-bold dark:text-material-green">
            Create Category
          </h1>
          <CategoryForm onSetShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
};

export default CategoryFormModal;
