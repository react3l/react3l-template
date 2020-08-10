import { Model } from "react3l/core";

export class TreeNode<T extends Model> {
    public title: string;
    public key: string | number;
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