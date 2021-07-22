import { XYPosition } from './components/ContextMenu';
import ContextMenuBridge from './ContextMenuBridge';

declare const useContextMenu: <Type>(bridge: ContextMenuBridge<Type>) => {
    clickPosition: XYPosition;
    data: Type;
    open: boolean;
};
export default useContextMenu;
