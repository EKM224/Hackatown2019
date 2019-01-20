import { Lieu } from '../Lieu';

interface EdgeToChild {
    distance: number;
    v: Vertex;
}

export class Vertex {
    public lieu: Lieu;
    public isEnd: any;
    public children: EdgeToChild[];
    constructor(lieu: Lieu, isEnd: Boolean) {
        this.lieu = lieu;
        this.isEnd = isEnd;
        this.children = [];
    }

    addChild(distance: number, v: Vertex): void {
        this.children.push({
            distance: distance,
            v: v,
        });
    }

    getPath(path: EdgeToChild[], finalPaths: EdgeToChild[][]): void {
       if (this.isEnd) {
           finalPaths.push(path);
       } else {
           this.children.forEach((child: EdgeToChild) => {
               path.push(child);
               child.v.getPath(path, finalPaths);
           });
       }
    }

    getFinalPaths(): EdgeToChild[][] {
        const path = [{distance: 0, v: this}];
        const finalPaths = [];
        this.getPath(path, finalPaths);
        return finalPaths;
    }

    getPathScore(path: EdgeToChild[]): number {
        const ratingSum: number = path.reduce((acc: number, e: EdgeToChild) =>  acc + e.v.lieu.rating, 0);
        return path.reduce((acc: number, e: EdgeToChild) => acc + e.distance / ratingSum, 0);
    }

}

// function test() {
//     const origin: Vertex = new Vertex({
//         nom : 'o',
//         adresse : 'o',
//         rating : 4,
//     }, false);
//     origin.addChild(4, new Vertex({
//         nom : '2',
//         adresse : '2',
//         rating : 6,
//     }, false));
//     origin.children[0].v.addChild(8, new Vertex({
//         nom : '2',
//         adresse : '2',
//         rating : 2,
//     }, true));
//     console.log(origin);
//     console.log(origin.children[0].v);
//     const allPaths = origin.getFinalPaths();
//     console.log(origin.getPathScore(allPaths[0]));
// }
// test();

