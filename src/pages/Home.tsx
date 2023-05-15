import {useRecoilValue} from 'recoil';
import userStateAtom from '../atoms/usersState.atom';

const Home: React.FC = () => {
	const user = useRecoilValue(userStateAtom);
	return <div className='text-center'>Welcome</div>;
};

export default Home;
