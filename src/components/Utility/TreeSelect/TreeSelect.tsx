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

export interface TreeSelectProps<T extends Model, TModelFilter extends ModelFilter> {
  searchProperty?: string;
  searchType?: string;
  checkable?: boolean;
  selectable?: boolean;
  modelFilter?: TModelFilter;
  placeHolder?: string;
  render?: (T: T) => string;
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
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
    checkable = false,
    selectable = true,
    filterClass: FilterClass,
    placeHolder,
    render,
    getTreeData,
  } = props;

  const [expanded, setExpanded] = React.useState<boolean>(false);

  const [listItem, setListItem] = React.useState<Model[]>();

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);

  const [filter, dispatch] = React.useReducer<Reducer<ModelFilter, filterAction<Model>>>(filterReducer, new FilterClass());

  const handleClearItem = React.useCallback((item: Model) => {
      const newListItem = listItem.filter((currentItem) => currentItem.id !== item.id);
      setListItem(newListItem);
  },[listItem]);
  
  const handleSearchItem = React.useCallback(debounce((searchTerm: string) => {
    dispatch({type: 'UPDATE', });
    }, DEBOUNCE_TIME_300), 
  []);

  const handleCloseList = React.useCallback(
    () => {
      setExpanded(false);
    },
    [],
  );

  const handleExpand = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setExpanded(true);
  }, []);

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
            <div className="tree-select__input-container">
              <input type="text"
                placeholder={placeHolder} 
                className="component__input"/>
            </div>
            }
        </div>
        { expanded && 
          <div className="tree-select__list">
            <Tree getTreeData={getTreeData}
                  modelFilter={filter}
                  height={300}
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
};

export default TreeSelect;
