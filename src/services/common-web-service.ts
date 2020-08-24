import { RefObject } from "react";
import React from "react";
import { Model } from "react3l/core";
import { TreeNode } from "models/TreeNode";

export const commonWebService = {
    useClickOutside(ref: RefObject<HTMLDivElement>, callback: () => void) {
        const handleClickOutside = React.useCallback(
            (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    if (typeof callback === "function") {
                        callback();
                    }
                }
            },
            [callback, ref],
        );

        React.useEffect(
            () => {
                document.addEventListener('mousedown', handleClickOutside);
                return function cleanup() {
                    document.removeEventListener("mousedown", handleClickOutside);
                };
            },
            [callback, handleClickOutside, ref],
        );
    },

    buildTree<T extends Model>(listItem: T[], parent?: TreeNode<T>, keyNodes?: number[], tree?: TreeNode<T>[]): [TreeNode<T>[], number[]] {
        tree = typeof tree !== 'undefined' ? tree : [];
        parent = typeof parent !== 'undefined' ? parent : new TreeNode();
        keyNodes = typeof keyNodes !== 'undefined' ? keyNodes : [];
            
        var children = listItem.filter((child) => { return child.parentId === parent.key; })
                            .map((currentItem) => new TreeNode(currentItem));
        
        if (children && children.length) {
            if ( parent.key === null ) {
               tree = children;   
            } else {
               parent.children = children;
               keyNodes.push(parent.key);
            }
            children.forEach((child) => {
                this.buildTree(listItem, child, keyNodes);
            });           
        }
        
        return [tree, keyNodes];
    },
};