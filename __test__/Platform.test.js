import Platform from '../src/Entities/Platform'
import Entity from '../src/Entities/Entity';


test('Checks if Platform is a subclass of Entity', () => {
  expect(Platform).toBeSubclassOf(Entity);
});
