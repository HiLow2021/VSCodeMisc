USE mysql; 

DELETE 
    FROM
        t_sex; 

INSERT 
    INTO t_sex 
    VALUES (0, '男'), 
    (1, '女');

DELETE 
    FROM
        t_zodiac; 

INSERT 
    INTO t_zodiac 
    VALUES (1, 'おひつじ座', '牡羊座', 'Aries', '♈'), 
    (2, 'おうし座', '牡牛座', 'Taurus', '♉'), 
    (3, 'ふたご座', '双子座', 'Gemini', '♊'), 
    (4, 'かに座', '蟹座', 'Cancer', '♋'), 
    (5, 'しし座', '獅子座', 'Leo', '♌'), 
    (6, 'おとめ座', '乙女座', 'Virgo', '♍'), 
    (7, 'てんびん座', '天秤座', 'Libra', '♎'), 
    (8, 'さそり座', '蠍座', 'Scorpio', '♏'), 
    (9, 'いて座', '射手座', 'Sagittarius', '♐'), 
    (10, 'やぎ座', '山羊座', 'Capricorn', '♑'), 
    (11, 'みずがめ座', '水瓶座', 'Aquarius', '♒'), 
    (12, 'うお座', '魚座', 'Pisces', '♓'), 
    (13, 'へびつかい座', '蛇遣い座', 'Ophiuchus', '⛎'); 

DELETE 
    FROM
        t_member; 

INSERT 
    INTO t_member 
    VALUES (1, '太郎', 0, NULL, NULL), 
    (2, '次郎', 0, NULL, NULL), 
    (3, '花子', 1, NULL, NULL);
