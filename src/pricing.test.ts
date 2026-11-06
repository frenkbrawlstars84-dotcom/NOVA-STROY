import test from 'node:test';
import assert from 'node:assert/strict';
import { calculate } from './pricing.ts';
test('base estimate uses area, rate and range',()=>{assert.deepEqual(calculate(58,'Под ключ','Новостройка',[]),{min:25100,max:33400});});
test('secondary housing and extras increase the estimate',()=>{const base=calculate(58,'Под ключ','Новостройка',[]);const extra=calculate(58,'Под ключ','Вторичное жильё',['Электрика','Сантехника']);assert.ok(extra.min>base.min);assert.ok(extra.max>base.max);assert.deepEqual(extra,{min:32700,max:43600});});
test('area and repair choice affect cost',()=>{assert.ok(calculate(100,'Капитальный','Новостройка',[]).min>calculate(50,'Капитальный','Новостройка',[]).min);assert.ok(calculate(50,'Под ключ','Новостройка',[]).min>calculate(50,'Косметический','Новостройка',[]).min);});
test('invalid and out-of-range areas stay bounded',()=>{assert.deepEqual(calculate(NaN,'Под ключ','Новостройка',[]),calculate(20,'Под ключ','Новостройка',[]));assert.deepEqual(calculate(200,'Под ключ','Новостройка',[]),calculate(150,'Под ключ','Новостройка',[]));});
