export interface TeamMember {
  id: string;
  group: 'leadership' | 'managers';   // ← ახალი: მხოლოდ ეს ორი მნიშვნელობა შეიძლება
  photo?: string;
  phone: string;
  email: string;
}

export const TEAM: TeamMember[] = [
  // ===== ხელმძღვანელობა =====
  {
    id: 'ceo',
    group: 'leadership',
    photo: 'images/team/ceo.webp',
    phone: '+995 5XX XX XX XX',
    email: 'name@modernmedical.ge',
  },
  {
    id: 'head-sales',
    group: 'leadership',
    photo: 'images/team/head-sales.webp',
    phone: '+995 5XX XX XX XX',
    email: 'name@modernmedical.ge',
  },

  // ===== მენეჯერები =====
  {
    id: 'm1',
    group: 'managers',
    photo: 'images/team/m1.webp',
    phone: '+995 5XX XX XX XX',
    email: 'name@modernmedical.ge',
  },
  {
    id: 'm2',
    group: 'managers',
    photo: 'images/team/m2.webp',
    phone: '+995 5XX XX XX XX',
    email: 'name@modernmedical.ge',
  },
  {
    id: 'm3',
    group: 'managers',
    photo: 'images/team/m3.webp',
    phone: '+995 5XX XX XX XX',
    email: 'name@modernmedical.ge',
  },
];