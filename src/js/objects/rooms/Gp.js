import Room from '../Room';
import Events from '../../util/Events';

Events.listen('build-gp', () => {
    (new Gp()).build();
});

/**
 * GPs office
 */
export default class Gp extends Room {
    constructor() {
        super();
    }
}
