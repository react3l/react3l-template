import React from 'react';
import './Tree.scss';
import { Model, ModelFilter } from 'react3l/core';
import { TreeNode } from 'models/TreeNode';
import { Tree as TreeAntd } from 'antd';
import {TreeProps as AntdTreeProps, EventDataNode} from 'antd/lib/tree';
import { Observable, ErrorObserver } from 'rxjs';
import { commonService } from 'react3l/services/common-service';
import { commonWebService } from 'services/CommonWebService';
import Spin from 'antd/lib/spin';
import { Empty } from 'antd';

function SwitcherIcon() {
  return (<span className="tree__icon">
            <i className="tio-chevron_down"></i>
         </span>);
};
export interface TreeProps <T extends Model, TModelFilter extends ModelFilter> {
  treeData?: TreeNode<T>[];
  modelFilter?: TModelFilter;
  expandedKeys?: number[];
  checkedKeys?: number[];
  checkable?: boolean;
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  onChange?: (treeNode: TreeNode<T>[]) => void;
}
function Tree(props: TreeProps<Model, ModelFilter> & AntdTreeProps) {
  const {
    treeData = [],
    modelFilter,
    expandedKeys,
    checkedKeys,
    checkable,
    getTreeData,
    onChange,
  } = props;

  const [internalTreeData, setInternalTreeData] = React.useState<TreeNode<Model>[]>(treeData);

  const [autoExpandParent, setAutoExpandParent] = React.useState<boolean>(true);

  const [internalExpandedKeys, setInternalExpandedKeys] = React.useState<number[]>(expandedKeys);

  const [internalCheckedKeys, setInternalCheckedKeys] = React.useState<number[]>(checkedKeys);

  const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<number[]>(checkedKeys);

  const [loading, setLoading] = React.useState<boolean>(false);

  const[subscription] = commonService.useSubscription();

  const searchTreeNode = React.useCallback((element: TreeNode<Model>, key: number) => {
    if (element.key === key){
      return element;
    } else if (element.children != null){
          var i;
          var result = null;
          for( i=0; result == null && i < element.children.length; i++ ){
              result = searchTreeNode(element.children[i], key);
          }
          return result;
    }
    return null;
  }, []);

  const searchTree = React.useCallback((treeNodes: TreeNode<Model>[], listKeys: number[]) => {
    const nodes = [];

    treeNodes.forEach((currentTree) => {
      listKeys.forEach((currentKey) => {
        const node = searchTreeNode(currentTree, currentKey);
        if (node) nodes.push(node);
      });
    });
    return nodes;
  }, [searchTreeNode]);
  
  const handleExpandKey = React.useCallback((expandedKeys: number[]) => {
    setInternalExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  }, []);

  const handleCheck: AntdTreeProps['onCheck'] = React.useCallback((checkedKeys: {
    checked: number[];
    halfChecked: number[];
  }) => {
    setInternalCheckedKeys(checkedKeys.checked);
    if (typeof onChange === 'function') {
      const checkedNodes = searchTree(internalTreeData, checkedKeys.checked);
      const checkedItems = checkedNodes.map((currentNode) => currentNode.item);
      onChange([...checkedItems]);
    }
  }, [internalTreeData, onChange, searchTree]);

  const handleSelect: AntdTreeProps['onSelect'] = React.useCallback((selectedKeys: number[], info: {
    event: "select";
    selected: boolean;
    node: EventDataNode;
    selectedNodes: TreeNode<Model>[];
    nativeEvent: MouseEvent;
}) => {
    setInternalSelectedKeys(selectedKeys);
    if (typeof onChange === 'function') {
      const checkedNodes = searchTree(internalTreeData, selectedKeys);
      const checkedItems = checkedNodes.map((currentNode) => currentNode.item);
      onChange([...checkedItems]);
    }
  }, [internalTreeData, onChange, searchTree]);

  React.useEffect(() => {
    if (checkable) {
      setInternalCheckedKeys(checkedKeys);
    } else {
      setInternalSelectedKeys(checkedKeys);
    }
  }, [checkable, checkedKeys]);

  React.useEffect(() => {
    if (typeof getTreeData === 'function') {
      subscription.add(getTreeData);
      setLoading(true);
      getTreeData(modelFilter).subscribe((res: Model[]) => {
        if (res) {
          const [treeData, internalExpandedKeys] = commonWebService.buildTree(res);
          setInternalTreeData(treeData);
          setInternalExpandedKeys(internalExpandedKeys);
        } else setInternalTreeData([]);
        setLoading(false); 
      }, (err: ErrorObserver<Error>) => {
        setLoading(false);
      });
    }
    return () => {
      
    };
  },[getTreeData, modelFilter, subscription]);

  return (
    <>
      <div className="tree-container">
        { loading ? 
          <div className="tree__loading">
              <img className="img-loading" src="/assets/svg/spinner.svg"  alt=''/>
          </div> :
          <>
            { 
              internalTreeData.length > 0 ? 
              <TreeAntd
                {...props}
                virtual
                autoExpandParent={autoExpandParent}
                expandedKeys={internalExpandedKeys}
                checkedKeys={internalCheckedKeys}
                selectedKeys={internalSelectedKeys}
                showLine={{ showLeafIcon: false }}
                switcherIcon={<SwitcherIcon />}
                treeData={internalTreeData}
                onExpand={handleExpandKey}
                onCheck={handleCheck}
                onSelect={handleSelect}
              ></TreeAntd> :
              <img className="img-emty" src="/assets/img/no-data.png"  alt=''/>
            }
          </>
        }
      </div>
    </>
  );
}

Tree.defaultProps = {};

export default Tree;
