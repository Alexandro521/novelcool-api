import { Router } from "express";
import { MangaController } from "../controller/mangas.js";

export const mangasRouter = Router()


mangasRouter.get('/index', MangaController.Index)
mangasRouter.get('/lasted', MangaController.Lasted)
mangasRouter.get('/complete', MangaController.Complete)
mangasRouter.get('/romance', MangaController.Romance)
mangasRouter.get('/comedy', MangaController.Comedy)
mangasRouter.get('/drama', MangaController.Drama)
mangasRouter.get('/action', MangaController.Action)
mangasRouter.get('/webcomic', MangaController.Webcomic)
mangasRouter.get('/category', MangaController.Action)
mangasRouter.get('/search', MangaController.search)
mangasRouter.get('/view/:id', MangaController.info)
mangasRouter.get('/info/genres', MangaController.genres)
mangasRouter.get('/reader/:ch/:id', MangaController.reader)




