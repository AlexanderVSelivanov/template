import {EntityRepository, getCustomRepository, Repository} from 'typeorm';
import NoteEntity from '../entities/NoteEntity';

@EntityRepository(NoteEntity)
class NoteRepository extends Repository<NoteEntity> {

}

const repositoryFactory = () => getCustomRepository(NoteRepository);

export default repositoryFactory;
