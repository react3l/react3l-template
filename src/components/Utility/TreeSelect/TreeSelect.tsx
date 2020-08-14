import React, { RefObject, Reducer } from 'react';
import './TreeSelect.scss';
import { Model } from 'react3l/core/model';
import { ModelFilter } from 'react3l/core/model-filter';
import Tree from '../Tree/Tree';
import InputTag from '../InputTag/InputTag';
import { debounce } from 'react3l/helpers';
import { DEBOUNCE_TIME_300 } from 'react3l/config';
import { Observable } from 'rxjs';
import nameof from 'ts-nameof.macro';
import { commonWebService } from 'services/common-web-service';
import { StringFilter } from 'react3l-advanced-filters/StringFilter';
import InputSelect from '../InputSelect/InputSelect';

export interface TreeSelectProps<T extends Model, TModelFilter extends ModelFilter> {
  listItem?: Model[];
  item?: Model;
  searchProperty?: string;
  searchType?: string;
  checkable?: boolean;
  selectable?: boolean;
  checkStrictly?: boolean;
  modelFilter?: TModelFilter;
  placeHolder?: string;
  render?: (T: T) => string;
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  onChange?: (T: Model[], TT: boolean) => void;
  filterClass?: new () => TModelFilter;
}
export interface filterAction<T extends Model> {
  type: string;
  data?: ModelFilter;
}

function filterReducer(state: ModelFilter, action: filterAction<Model>): ModelFilter {
  switch(action.type) {
    case 'UPDATE':
      return action.data;
  }
  return;
}

function TreeSelect(props: TreeSelectProps<Model, ModelFilter>) {
  const {
    listItem,
    item,
    checkStrictly,
    searchProperty,
    searchType,
    checkable,
    selectable,
    filterClass: FilterClass,
    placeHolder,
    render,
    getTreeData,
    onChange,
  } = props;
 
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const listIds = React.useMemo(() => {
    if (item) return [item.id];
    if (listItem) return listItem.map((currentItem) => currentItem.id);
    return [];
  }, [listItem, item]);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);

  const [filter, dispatch] = React.useReducer<Reducer<ModelFilter, filterAction<Model>>>(filterReducer, new FilterClass());

  const handleClearItem = React.useCallback((item: Model) => {
      if (checkable) {
        const newListItem = listItem.filter((currentItem) => currentItem.id !== item.id);
        onChange(newListItem, checkable);
      } else {
        onChange([], checkable);
      }
  },[listItem, onChange, checkable]);
  
  const handleSearchItem = React.useCallback(debounce((searchTerm: string) => {
    const cloneFilter = {...filter};
    cloneFilter[searchProperty][searchType] = searchTerm;
    dispatch({type: 'UPDATE', data: cloneFilter});
    }, DEBOUNCE_TIME_300), 
  []);

  const handleCloseList = React.useCallback(
    () => {
      setExpanded(false);
    },
    [],
  );

  const handleExpand = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!expanded) {
      dispatch({type: 'UPDATE', data: new FilterClass()});
    }
    setExpanded(true);
  }, [FilterClass, expanded]);

  const handleOnchange = React.useCallback((selectedNodes: Model[]) => {
    onChange([...selectedNodes], checkable);
    if (!checkable) setExpanded(false);
  },[onChange, checkable]);

  commonWebService.useClickOutside(wrapperRef, handleCloseList);

  return (
    <>
      <div className="tree-select__container" ref={wrapperRef}>
        <div className="tree-select__input" onClick={handleExpand}>
          { checkable ? 
            <InputTag listItem={listItem}
              render={render}
              placeHolder={placeHolder}
              onSearch={handleSearchItem}
              onClear={handleClearItem}/> :
            <InputSelect model={item}
              render={render}
              placeHolder={placeHolder}
              expanded={expanded}
              onSearch={handleSearchItem}
              onClear={handleClearItem}/>
            }
        </div>
        { expanded && 
          <div className="tree-select__list">
            <Tree getTreeData={getTreeData}
                  checkedKeys={listIds}
                  modelFilter={filter}
                  checkStrictly={checkStrictly}
                  height={300}
                  onChange={handleOnchange}
                  selectable={selectable}
                  checkable={checkable}
                  titleRender={render}
            />
          </div>
        }
      </div>
    </>
  );
}

TreeSelect.defaultProps = {
  placeHolder: `Select ${nameof(TreeSelect)}...`,
  searchProperty: nameof(Model.prototype.name),
  searchType: nameof(StringFilter.prototype.startWith),
  filterClass: ModelFilter,
  checkable: false,
  selectable: true,
};

export default TreeSelect;
