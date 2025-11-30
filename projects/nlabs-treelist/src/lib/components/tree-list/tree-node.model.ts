export interface TreeNode {
  id: string;
  parentId?: string;
  name: string;
  imageUrl?: string; // Görsel URL'si
  children?: TreeNode[];
  expanded?: boolean;
  checked?: boolean;
  hasChildren?: boolean; // API'den gelecek, child'ı olup olmadığını belirtir
  [key: string]: any; // Ek alanlar için (tablo kolonları vs.)
}
