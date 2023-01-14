// 지워진 노드의 자식 노드들을 모두 찾아 idxToRemove 배열에 push
// 파라미터로 받은 idxToRemove는 call by reference로, 주소에 의한 배열 호출
const findChildNodesIndex = (treeArr, parentNodeNum, idxToRemove) => {
    treeArr.forEach((e, idx) => {
        if (e[1] === parentNodeNum) {
            // parentNodeNum의 직전 자식 노드를 idxToRemove에 push
            idxToRemove.push(idx);
            // parentNodeNum의 직전 자식 노드의 자식 노드들을 찾음
            // 매개변수 idxToRemove는 주소가 호출되어, 재귀 호출되어도 원본 배열에 push
            findChildNodesIndex(treeArr, e[0], idxToRemove);
        }
    })
};

const main = input => {

    // tree 내 각 노드는 [노드 넘버, 부모 노드 넘버] 구조로 들어감
    // ex. 테케 1~3(-1 0 0 1 1)의 경우 [[0, -1], [1, 0], [2, 0], [3, 1], [4, 1]]
    const tree = [];
    
    // 배열 tree 초기화
    input[1].split(' ').map(e => parseInt(e)).forEach((e, idx) => {
        tree.push([idx, e]);
    })
    
    // tree에서 지울 자식 노드들의 인덱스 배열
    const idxToRemove = [];
    
    // 입력된(input[2]) 노드 지우기
    tree.splice(tree.findIndex(e => e[0] === parseInt(input[2])), 1);
    // idxToRemove에 자식 노드(고아 노드가 된) 인덱스 삽입
    findChildNodesIndex(tree, parseInt(input[2]), idxToRemove);
    
    // idxToRemove가 정렬되지 않으면 e-idx번 멤버를 삭제하는 데 오류가 발생하는 것을 확인해 sort() 추가
    idxToRemove.sort().forEach((e, idx) => {
        tree.splice(e - idx, 1);
    })
    
    // leafNode의 개수
    let leafNode = 0;

    tree.forEach((e1) => {
        // tree의 각 멤버(e1)에 대해, 해당 노드가 자식을 가지는지 한 번 더 tree 내 멤버들(e2)을 탐색
        // e1의 자식 노드가 없는 경우는 모든 e2의 부모 노드가 e1이 아님을 의미하므로, e1의 자식 노드 e2를 filter()로 검색하여 개수 체크(length)
        if (tree.filter(e2 => e1[0] === e2[1]).length === 0) {
            leafNode++;
        }
    })
    // 연산이 끝난 후 leafNode, 즉 리프 노드의 개수 출력
    console.log(leafNode);
}

module.exports = main;