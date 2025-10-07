/**
 * New Set Methods (ES2024)
 * 
 * Set now has mathematical set operations:
 * - union() - elements in either set
 * - intersection() - elements in both sets
 * - difference() - elements in first but not second
 * - symmetricDifference() - elements in either but not both
 * - isSubsetOf() - check if subset
 * - isSupersetOf() - check if superset
 * - isDisjointFrom() - check if no common elements
 */

// Creating sets
const setA = new Set([1, 2, 3, 4, 5]);
const setB = new Set([4, 5, 6, 7, 8]);

// 1. union() - combines both sets
const union = setA.union(setB);
console.log([...union]); // [1, 2, 3, 4, 5, 6, 7, 8]

// 2. intersection() - common elements
const intersection = setA.intersection(setB);
console.log([...intersection]); // [4, 5]

// 3. difference() - in A but not in B
const difference = setA.difference(setB);
console.log([...difference]); // [1, 2, 3]

// 4. symmetricDifference() - in either but not both
const symDiff = setA.symmetricDifference(setB);
console.log([...symDiff]); // [1, 2, 3, 6, 7, 8]

// 5. isSubsetOf() - all elements of A are in B
const small = new Set([1, 2]);
const large = new Set([1, 2, 3, 4]);

console.log(small.isSubsetOf(large));  // true
console.log(large.isSubsetOf(small));  // false

// 6. isSupersetOf() - A contains all elements of B
console.log(large.isSupersetOf(small)); // true
console.log(small.isSupersetOf(large)); // false

// 7. isDisjointFrom() - no common elements
const set1 = new Set([1, 2, 3]);
const set2 = new Set([4, 5, 6]);
const set3 = new Set([3, 4, 5]);

console.log(set1.isDisjointFrom(set2)); // true (no overlap)
console.log(set1.isDisjointFrom(set3)); // false (3 is common)

// Practical examples

// 1. User permissions
const adminPerms = new Set(['read', 'write', 'delete', 'admin']);
const userPerms = new Set(['read', 'write']);

const hasAllPerms = userPerms.isSubsetOf(adminPerms);
console.log(hasAllPerms); // true

// 2. Find common interests
const alice = new Set(['coding', 'reading', 'music']);
const bob = new Set(['music', 'sports', 'reading']);

const commonInterests = alice.intersection(bob);
console.log([...commonInterests]); // ['reading', 'music']

// 3. Find unique skills
const team1Skills = new Set(['JS', 'React', 'Node']);
const team2Skills = new Set(['Python', 'React', 'Django']);

const uniqueToTeam1 = team1Skills.difference(team2Skills);
console.log([...uniqueToTeam1]); // ['JS', 'Node']

// 4. Combine user lists (no duplicates)
const activeUsers = new Set(['alice', 'bob', 'charlie']);
const premiumUsers = new Set(['bob', 'david', 'eve']);

const allUsers = activeUsers.union(premiumUsers);
console.log([...allUsers]); // ['alice', 'bob', 'charlie', 'david', 'eve']

// 5. Feature flags
const enabledFeatures = new Set(['dark-mode', 'notifications', 'analytics']);
const requiredFeatures = new Set(['dark-mode', 'notifications']);

const hasRequired = requiredFeatures.isSubsetOf(enabledFeatures);
console.log(hasRequired); // true

// 6. Tag filtering
const postTags = new Set(['javascript', 'react', 'frontend']);
const filterTags = new Set(['react', 'vue']);

const matchingTags = postTags.intersection(filterTags);
const hasMatch = !postTags.isDisjointFrom(filterTags);
console.log(hasMatch); // true (react is common)

// 7. Array deduplication and operations
const arr1 = [1, 2, 3, 2, 1];
const arr2 = [3, 4, 5, 4, 3];

const uniqueInBoth = new Set(arr1).union(new Set(arr2));
console.log([...uniqueInBoth]); // [1, 2, 3, 4, 5]

// Chaining operations
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);
const c = new Set([5, 6, 7, 8]);

const result = a.union(b).intersection(c);
console.log([...result]); // [5, 6]

// Old way vs new way comparison

// OLD: Manual union
function oldUnion(setA, setB) {
  const result = new Set(setA);
  for (const item of setB) {
    result.add(item);
  }
  return result;
}

// NEW: Built-in
const newUnion = setA.union(setB);

// OLD: Manual intersection
function oldIntersection(setA, setB) {
  const result = new Set();
  for (const item of setA) {
    if (setB.has(item)) {
      result.add(item);
    }
  }
  return result;
}

// NEW: Built-in
const newIntersection = setA.intersection(setB);

// Works with any iterable
const set = new Set([1, 2, 3]);
const array = [2, 3, 4];
const unionWithArray = set.union(array);
console.log([...unionWithArray]); // [1, 2, 3, 4]

// Complex example: Access control
class AccessControl {
  constructor() {
    this.roles = {
      admin: new Set(['read', 'write', 'delete', 'manage']),
      editor: new Set(['read', 'write']),
      viewer: new Set(['read'])
    };
  }
  
  canPerformAction(userRoles, requiredPermissions) {
    const userPermissions = userRoles.reduce(
      (acc, role) => acc.union(this.roles[role] || new Set()),
      new Set()
    );
    return requiredPermissions.isSubsetOf(userPermissions);
  }
  
  getCommonPermissions(role1, role2) {
    return this.roles[role1].intersection(this.roles[role2]);
  }
  
  getUniquePermissions(role1, role2) {
    return this.roles[role1].difference(this.roles[role2]);
  }
}

const acl = new AccessControl();
const canDelete = acl.canPerformAction(
  ['editor'],
  new Set(['read', 'write'])
);
console.log(canDelete); // true

export { AccessControl };
