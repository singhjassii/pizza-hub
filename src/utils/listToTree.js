export default function listToTree(arr) {
  const list = JSON.parse(JSON.stringify(arr));
  const map = {};
  let node;
  const roots = [];
  let i;
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = [];
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent) {
      // if you have dangling branches check that map[node.parent_id] exists
      list[map[node.parent]]?.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
