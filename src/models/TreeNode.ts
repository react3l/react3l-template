import { Model } from "react3l/core";
import { DataNode } from "antd/lib/tree";

export class TreeNode<T extends Model> implements DataNode {
    public title: string;
    public key: number;
    public item: Model;
    public children: TreeNode<T>[];

    constructor(model?: T) {
        if (model) {
            this.key = model.id;
            this.item = {...model};
            this.children = [];
            this.title = model.name;
        } else {
            this.title = '';
            this.key = null;
            this.children = [];
            this.item = {};
        }
    }
}