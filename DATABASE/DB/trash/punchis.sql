ALTER TABLE productos ADD FOREIGN KEY(subCat_id) REFERENCES productos_subcategorias(subCat_id) ON UPDATE CASCADE ON DELETE CASCADE ;



ALTER TABLE productos_subcategorias ADD FOREIGN KEY (prod_id) REFERENCES productos(prod_id) ON UPDATE CASCADE ON DELETE CASCADE ;