// =========================================
// მწარმოებლები
// ახალი მწარმოებელი = ერთი ხაზი აქ
// =========================================

export interface Manufacturer {
  id: string;      // პროდუქტში ამით ვუთითებთ: manufacturer: 'medtronic'
  name: string;    // ორივე ენაზე ერთნაირია
  logo?: string;   // არასავალდებულო
}

export const MANUFACTURERS: Manufacturer[] = [
  { id: 'medtronic',  name: 'Medtronic',  logo: 'images/suppliers/medtronic.webp' },
  { id: 'balt',       name: 'Balt',       logo: 'images/suppliers/balt.webp' },
  { id: 'medacta',    name: 'Medacta',    logo: 'images/suppliers/medacta.webp' },
  { id: 'kanghui',    name: 'Kanghui',    logo: 'images/suppliers/kanghui.webp' },
  { id: 'penumbra',   name: 'Penumbra',   logo: 'images/suppliers/penumbra.webp' },
  { id: 'geister',    name: 'Geister',    logo: 'images/suppliers/geister.webp' },
  { id: 'sanatmetal', name: 'Sanatmetal' },
  { id: 'human-tech', name: 'Human Tech' },
  { id: 'bioscience', name: 'BioScience' },
];

// id-ით მწარმოებლის პოვნა: getManufacturer('medtronic') → { name: 'Medtronic', ... }
export function getManufacturer(id: string): Manufacturer | undefined {
  return MANUFACTURERS.find(m => m.id === id);
}
