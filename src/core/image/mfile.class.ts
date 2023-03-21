// eslint-disable-next-line @typescript-eslint/naming-convention
class MFile {
  public originalname: string;

  public buffer: Buffer;

  constructor(file: Express.Multer.File | MFile) {
    this.buffer = file.buffer;
    this.originalname = file.originalname;
  }
}

export default MFile;
