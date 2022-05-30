const fs = require('fs');
const path = require('path');

const taskDefPath = path.join(process.cwd(), 'task-definition.json');
const ignoredTaskDefAttributes = [
  'compatibilities',
  'taskDefinitionArn',
  'requiresAttributes',
  'revision',
  'status',
  'registeredAt',
  'deregisteredAt',
  'registeredBy',
];

const task = async () => {
  if (!fs.existsSync(taskDefPath))
    throw new Error(`${taskDefPath} does not exist`);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const taskDef = require(taskDefPath);
  ignoredTaskDefAttributes.forEach((eachIgnoredAttribute) => {
    delete taskDef[eachIgnoredAttribute];
  });
  fs.writeFileSync(taskDefPath, JSON.stringify(taskDef, null, 2));
  process.exit(0);
};
void task();
