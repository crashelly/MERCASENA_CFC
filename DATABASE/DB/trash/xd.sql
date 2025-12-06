BEGIN
DECLARE currentHour DATETIME;
DECLARE currentDateTime TIME;

    DECLARE currentDateTimePlusOneHour DATETIME;
    DECLARE currentTimePlusOneHour TIME;
       SET currentHour = CURTIME();
    -- Get the current date and time
    SET currentDateTime = NOW();
    
    -- Calculate current time plus one hour
    SET currentDateTimePlusOneHour = DATE_ADD(currentDateTime, INTERVAL 1 HOUR);
     SET currentTimePlusOneHour = ADDTIME(currentHour, '01:00:00');

    INSERT INTO `pedidos`(`pedi_id` ,`pedi_preciototal`, `usr_id`,`pedi_fechaCreacion`,`pedi_expiracion`,`pedi_horaExpiracion`)
    VALUES(p_id,p_preciototal, p_usr_id,CURDATE(),currentDateTimePlusOneHour,);
END