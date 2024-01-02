import {
  Dispatch,
  cloneElement,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
// import { useOutsideClick } from "../hooks/useOutsideClick";

interface ContextType {
  openName: string;
  setOpenName: Dispatch<SetStateAction<string>>;
}

const ModalContext = createContext<ContextType>({
  openName: '',
  setOpenName: () => {},
});

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState('');

  return (
    <ModalContext.Provider value={{ openName, setOpenName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens,
}: {
  children: React.ReactElement;
  opens: string;
}) {
  const { setOpenName } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => setOpenName(opens),
  });
}

function Window({
  name,
  children,
}: {
  children: React.ReactElement;
  name: string;
}) {
  const { openName, setOpenName } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <>
      <div
        onClick={() => setOpenName('')}
        className="fixed top-0 backdrop-blur h-screen w-[100%]"
      />
      <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-6  overflow-hidden bg-white rounded drop-shadow-lg sm:max-w-[34rem] md:max-w-[34rem] w-[90%] h-[25rem]">
        <button
          className="fixed right-4 top-4 rounded dark:hover:bg-gray-700 hover:bg-gray-100 p-1 transition-all "
          onClick={() => setOpenName('')}
        >
          <HiXMark size={26} />
        </button>
        {cloneElement(children, { onCloseModal: () => setOpenName('') })}
      </div>
    </>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

