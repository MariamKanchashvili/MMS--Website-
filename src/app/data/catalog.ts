// =========================================
// კატალოგის სტრუქტურა: მიმართულებები და კატეგორიები
// სახელები (ქართულად/ინგლისურად) ka.json / en.json-შია:
//   PRODUCTS.DIRECTIONS.<id>, PRODUCTS.GROUPS.<id>, PRODUCTS.CATEGORIES.<id>
// =========================================

// მიმართულებები: მხოლოდ ეს მნიშვნელობები შეიძლება
export type DirectionId = 'coronary' | 'orthopedics' | 'aesthetics' | 'equipment' | 'implants';

// ჩანართების თანმიმდევრობა გვერდზე
export const DIRECTIONS: DirectionId[] = [
  'coronary',
  'orthopedics',
  'aesthetics',
  'equipment',
  'implants',
];

export interface Category {
  id: string;              // URL-ში და თარგმანში: ?category=stent
  direction: DirectionId;  // რომელ მიმართულებას ეკუთვნის
  group?: string;          // ქვეჯგუფი (არასავალდებულო): 'hip', 'spine'...
}

// ახალი კატეგორია = ერთი ხაზი აქ + თარგმანი JSON-ში
export const CATEGORIES: Category[] = [
  // ===== კორონარული =====
  { id: 'balloon',     direction: 'coronary' },
  { id: 'stent',       direction: 'coronary' },
  { id: 'valve',       direction: 'coronary' },
  { id: 'guidewire',   direction: 'coronary' },
  { id: 'oxygenator',  direction: 'coronary' },
  { id: 'introducer',  direction: 'coronary' },
  { id: 'shunt',       direction: 'coronary' },

  // ===== ორთოპედია: მენჯ-ბარძაყი =====
  { id: 'cup',         direction: 'orthopedics', group: 'hip' },
  { id: 'liner',       direction: 'orthopedics', group: 'hip' },
  { id: 'stem',        direction: 'orthopedics', group: 'hip' },
  { id: 'cement',      direction: 'orthopedics', group: 'hip' },
  { id: 'prosthesis',  direction: 'orthopedics', group: 'hip' },

  // ===== ორთოპედია: ხერხემალი =====
  { id: 'screw',       direction: 'orthopedics', group: 'spine' },
  { id: 'cage',        direction: 'orthopedics', group: 'spine' },

  // ===== ესთეტიკა =====
  { id: 'face-filler', direction: 'aesthetics' },
  { id: 'body-filler', direction: 'aesthetics' },

  // აპარატურა და იმპლანტები: კატეგორიები მოგვიანებით დაემატება
];
