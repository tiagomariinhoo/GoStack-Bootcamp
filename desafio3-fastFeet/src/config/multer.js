/**
 * Vai ficar toda a configuração da parte de upload de arquivos
 */

import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

// Exporta um objeto de configuração
export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'), // Destino dos arquivos
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err); // Cb é o callback

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
