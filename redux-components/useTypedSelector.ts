import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from './store/store';

const store = configureStore();

const useTypedSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector;

export default useTypedSelector;
