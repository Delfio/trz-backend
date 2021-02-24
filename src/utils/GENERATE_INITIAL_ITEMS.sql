
INSERT INTO tbl_item(item_id, item_description, item_points, item_amount_total)
values('9404683e-7581-11eb-9314-0242c0a85003','AK47', 10, 20) ON CONFLICT(item_id) DO NOTHING;

INSERT INTO tbl_item(item_id, item_description, item_points, item_amount_total)
values('2f89fa66-7583-11eb-8531-0242c0a85003','Fiji Water', 14, 10) ON CONFLICT(item_id) DO NOTHING;

INSERT INTO tbl_item(item_id, item_description, item_points, item_amount_total)
values('940484e0-7581-11eb-9314-0242c0a85003','Campbell Soup', 12, 10) ON CONFLICT(item_id) DO NOTHING;

INSERT INTO tbl_item(item_id, item_description, item_points, item_amount_total)
values('94049156-7581-11eb-9314-0242c0a85003','First Aid Pouch', 10, 10) ON CONFLICT(item_id) DO NOTHING;
