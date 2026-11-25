import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Tasks } = require('./helpers/load-renderer.js').loadRenderer();

// Kısa örnek liste: A, B, C (sırayla eklenmiş)
const sample = () => ['A', 'B', 'C'].reduce((list, t) => Tasks.add(list, t, t), []);
const order = (list) => Tasks.active(list).map((t) => t.id).join(',');

describe('add', () => {
  it('yeni görevi sona, None önceliğiyle ekler', () => {
    const list = sample();
    expect(order(list)).toBe('A,B,C');
    expect(list[2]).toMatchObject({ id: 'C', title: 'C', priority: 'none', completed: false, order: 3, completedAt: null });
  });
  it('boş veya yalnızca boşluk olan görevi eklemez', () => {
    const list = sample();
    expect(Tasks.add(list, '   ', 'x')).toBe(list);
    expect(Tasks.add(list, '', 'x')).toBe(list);
  });
  it('metnin başındaki ve sonundaki boşlukları kırpar', () => {
    expect(Tasks.add([], '  Read  ', 'r')[0].title).toBe('Read');
  });
});

describe('edit', () => {
  it('metni günceller', () => {
    expect(Tasks.edit(sample(), 'B', 'B2').find((t) => t.id === 'B').title).toBe('B2');
  });
  it('boş metinde eski metni korur (D-25)', () => {
    const list = sample();
    expect(Tasks.edit(list, 'B', '  ')).toBe(list);
  });
  it('değişiklik yoksa aynı diziyi döndürür (gereksiz kayıt olmaz)', () => {
    const list = sample();
    expect(Tasks.edit(list, 'B', 'B')).toBe(list);
  });
});

describe('remove', () => {
  it('görevi siler ve sıralamayı 1..n yapar', () => {
    const list = Tasks.remove(sample(), 'A');
    expect(Tasks.active(list).map((t) => t.order)).toEqual([1, 2]);
    expect(order(list)).toBe('B,C');
  });
  it('bilinmeyen id için değişiklik yapmaz', () => {
    const list = sample();
    expect(Tasks.remove(list, 'nope')).toBe(list);
  });
});

describe('complete / restore', () => {
  it('tamamlanan görev aktif listeden çıkar ve completedAt alır', () => {
    const list = Tasks.complete(sample(), 'B', '2026-11-05T10:00:00Z');
    expect(order(list)).toBe('A,C');
    expect(Tasks.completed(list)[0]).toMatchObject({ id: 'B', completed: true, completedAt: '2026-11-05T10:00:00Z' });
  });
  it('en son tamamlanan en üstte (D-24)', () => {
    let list = Tasks.complete(sample(), 'A', '2026-11-05T10:00:00Z');
    list = Tasks.complete(list, 'C', '2026-11-05T11:00:00Z');
    expect(Tasks.completed(list).map((t) => t.id)).toEqual(['C', 'A']);
  });
  it('geri alınan görev eski konumuna ve önceliğiyle döner', () => {
    let list = Tasks.setPriority(sample(), 'B', 'high');
    list = Tasks.complete(list, 'B', '2026-11-05T10:00:00Z');
    list = Tasks.restore(list, 'B');
    expect(order(list)).toBe('A,B,C');
    expect(list.find((t) => t.id === 'B')).toMatchObject({ completed: false, completedAt: null, priority: 'high' });
  });
  it('liste kısaldıysa sona döner', () => {
    let list = Tasks.complete(sample(), 'C', 't');
    list = Tasks.remove(Tasks.remove(list, 'A'), 'B');
    expect(order(Tasks.restore(list, 'C'))).toBe('C');
  });
});

describe('setPriority', () => {
  it('geçerli öncelikleri uygular', () => {
    for (const p of ['high', 'medium', 'low', 'none']) {
      expect(Tasks.setPriority(sample(), 'A', p)[0].priority).toBe(p);
    }
  });
  it('geçersiz önceliği reddeder', () => {
    const list = sample();
    expect(Tasks.setPriority(list, 'A', 'urgent')).toBe(list);
  });
});

describe('move (sürükle-bırak)', () => {
  it('ilk görevi sona taşır', () => {
    expect(order(Tasks.move(sample(), 'A', 2))).toBe('B,C,A');
  });
  it('son görevi başa taşır ve order değerlerini yeniler', () => {
    const list = Tasks.move(sample(), 'C', 0);
    expect(order(list)).toBe('C,A,B');
    expect(Tasks.active(list).map((t) => t.order)).toEqual([1, 2, 3]);
  });
  it('aynı konuma bırakılırsa değişiklik yapmaz', () => {
    const list = sample();
    expect(Tasks.move(list, 'B', 1)).toBe(list);
  });
  it('tamamlanmış görev taşınamaz', () => {
    const list = Tasks.complete(sample(), 'A', 't');
    expect(Tasks.move(list, 'A', 1)).toBe(list);
  });
});
