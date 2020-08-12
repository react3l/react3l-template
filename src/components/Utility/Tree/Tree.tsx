import React from 'react';
import './Tree.scss';
import { Model, ModelFilter } from 'react3l/core';
import { TreeNode } from 'models/TreeNode';
import { Tree as TreeAntd } from 'antd';
import {TreeProps as AntdTreeProps, EventDataNode} from 'antd/lib/tree';
import { Observable, ErrorObserver } from 'rxjs';
import { commonService } from 'react3l/services/common-service';
import { commonWebService } from 'services/common-web-service';
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
  selectedKeys?: number[];
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  onChange?: (treeNode: TreeNode<T>[]) => void;
}
function Tree(props: TreeProps<Model, ModelFilter> & AntdTreeProps) {
  const {
    treeData = [],
    modelFilter,
    expandedKeys,
    checkedKeys,
    selectedKeys,
    getTreeData,
    onChange,
  } = props;

  const [internalTreeData, setInternalTreeData] = React.useState<TreeNode<Model>[]>(treeData);

  const [autoExpandParent, setAutoExpandParent] = React.useState<boolean>(true);

  const [internalExpandedKeys, setInternalExpandedKeys] = React.useState<number[]>(expandedKeys);

  const [internalCheckedKeys, setInternalCheckedKeys] = React.useState<number[]>(checkedKeys);

  const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<number[]>(selectedKeys);

  const [loading, setLoading] = React.useState<boolean>(false);

  const[subscription] = commonService.useSubscription();

  const searchTreeNode = React.useCallback((key: number, treeData: TreeNode<Model>[]) => {
    for(let i = 0; i < treeData.length; i++) {
      if (treeData[i].key === key) 
        return treeData[i];
      if (treeData[i].children) {
        return searchTreeNode(key, treeData[i].children);
      } else break;
    }
  }, []);
  
  const handleExpandKey = React.useCallback((expandedKeys: number[]) => {
    setInternalExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  }, []);

  const handleCheck: AntdTreeProps['onCheck'] = React.useCallback((checkedKeys: number[]) => {
    setInternalCheckedKeys(checkedKeys);
    if (typeof onChange === 'function') {
      const checkedNodes = checkedKeys.map((current) => {
        return searchTreeNode(current, internalTreeData);
      });
      onChange([...checkedNodes]);
    }
  }, [searchTreeNode, internalTreeData, onChange]);

  const handleSelect: AntdTreeProps['onSelect'] = React.useCallback((selectedKeys: number[], info: {
    event: "select";
    selected: boolean;
    node: EventDataNode;
    selectedNodes: TreeNode<Model>[];
    nativeEvent: MouseEvent;
}) => {
    setInternalSelectedKeys(selectedKeys);
    if (typeof onChange === 'function') {
      const selectedNodes = selectedKeys.map((current) => {
        return searchTreeNode(current, internalTreeData);
      });
      onChange([...selectedNodes]);
    }
  }, [onChange, internalTreeData, searchTreeNode]);

  React.useEffect(() => {
    if (typeof getTreeData === 'function') {
      subscription.add(getTreeData);
      setLoading(true);
      getTreeData(modelFilter).subscribe((res: Model[]) => {
        if (res) {
          const [treeData, expandedKeys] = commonWebService.buildTree(res);
          setInternalTreeData(treeData);
          setInternalExpandedKeys(expandedKeys);
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
              <Spin tip="Loading..."></Spin>
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
              <Empty imageStyle={{height: 60}}/>
            }
          </>
        }
      </div>
    </>
  );
}

Tree.defaultProps = {};

export default Tree;
