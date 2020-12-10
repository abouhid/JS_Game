import Item from '../src/Entities/Item';
import Entity from '../src/Entities/Entity';


test('Checks if Item is a subclass of Entity', () => {
  expect(Item).toBeSubclassOf(Entity);
});
