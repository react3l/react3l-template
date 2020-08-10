import React from 'react';
import './Tree.scss';
import { Model, ModelFilter } from 'react3l/core';
import { TreeNode } from 'models/TreeNode';
import { Tree as TreeAntd } from 'antd';
import {TreeProps as AntdTreeProps} from 'antd/lib/tree';
import { Observable } from 'rxjs';
import { commonService } from 'react3l/services/common-service';
import { commonWebService } from 'services/common-web-service';

export function SwitcherIcon() {
  return (<span className="tree__icon">
            <i className="tio-chevron_down"></i>
         </span>);
};
export interface TreeProps <T extends Model, TModelFilter extends ModelFilter> {
  treeData?: TreeNode<T>[];
  modelFilter?: TModelFilter;
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
}
function Tree(props: TreeProps<Model, ModelFilter> & AntdTreeProps) {
  const {
    treeData,
    modelFilter,
    getTreeData,
  } = props;
  const [internalTreeData, setInternalTreeData] = React.useState<TreeNode<Model>[]>(treeData);
  const[subscription] = commonService.useSubscription();   
  React.useEffect(() => {
    if (typeof getTreeData === 'function') {
      subscription.add(getTreeData);
      getTreeData(modelFilter).subscribe((res) => {
        if (res) {
          setInternalTreeData(commonWebService.buildTree(res));
        } 
      });
    }
  },[getTreeData, modelFilter, subscription]);

  return (
    <>
      <div className="tree-container">
        <TreeAntd
          defaultExpandAll
          checkable
          titleRender={(nodeData: any) => nodeData.item?.code}
          treeData={internalTreeData}
        ></TreeAntd>
      </div>
    </>
  );
}
Tree.defaultProps = {
  treeData: [{title: 'Test1', key: 1, item: {}, children: []}],
};
export default Tree;
