import { useLocation, useNavigate } from 'react-router-dom';
import { MdFavorite } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';

interface IHeaderParams {
  showArrowBack?: boolean;
}

export function Header({ showArrowBack = false }: IHeaderParams): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-red-700 mx-auto flex items-center justify-center p-4 lg:px-8 relative">
      {(location.pathname !== '/' || showArrowBack) && (
        <BiArrowBack
          className="text-white cursor-pointer md:w-[40px] md:h-[40px]"
          size={24}
          onClick={() => {
            navigate('/');
            navigate(0);
          }}
        />
      )}
      <img
        onClick={() => {
          navigate('/');
          navigate(0);
        }}
        className="m-auto absolute cursor-pointer"
        src="assets/images/logo-pokedex.png"
        alt="logo do pokemon"
      />
      <div
        className="ml-auto flex flex-col items-center cursor-pointer hover:scale-150"
        onClick={() => {
          navigate('/favorites');
        }}
      >
        <span className="text-white font-semibold">Favoritos</span>
        <MdFavorite color="#FA8072" size={40} />
      </div>
    </header>
  );
}
