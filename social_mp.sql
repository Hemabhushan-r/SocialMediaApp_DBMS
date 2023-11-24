-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)

--

-- Host: localhost    Database: social_media_app_dbms_mp

-- ------------------------------------------------------

-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */

;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */

;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */

;

/*!50503 SET NAMES utf8mb4 */

;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */

;

/*!40103 SET TIME_ZONE='+00:00' */

;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */

;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */

;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */

;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */

;

--

-- Table structure for table `follower`

--

DROP TABLE IF EXISTS `follower`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `follower` (
        `followerprofileid` bigint NOT NULL,
        `followedprofileid` bigint NOT NULL,
        PRIMARY KEY (
            `followerprofileid`,
            `followedprofileid`
        ),
        KEY `followedprofileid` (`followedprofileid`),
        CONSTRAINT `follower_ibfk_1` FOREIGN KEY (`followerprofileid`) REFERENCES `profile` (`profileid`),
        CONSTRAINT `follower_ibfk_2` FOREIGN KEY (`followedprofileid`) REFERENCES `profile` (`profileid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `follower`

--

LOCK TABLES `follower` WRITE;

/*!40000 ALTER TABLE `follower` DISABLE KEYS */

;

INSERT INTO `follower`
VALUES (7, 6), (8, 6), (9, 6), (6, 7), (8, 7), (9, 7), (6, 8);

/*!40000 ALTER TABLE `follower` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `location`

--

DROP TABLE IF EXISTS `location`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `location` (
        `LocationId` bigint NOT NULL AUTO_INCREMENT,
        `Country` varchar(15) DEFAULT NULL,
        `State` varchar(15) DEFAULT NULL,
        `City` varchar(15) DEFAULT NULL,
        `Street` varchar(20) DEFAULT NULL,
        `ZipCode` varchar(10) DEFAULT NULL,
        `currentlocofprofileid` bigint DEFAULT NULL,
        PRIMARY KEY (`LocationId`),
        KEY `currentlocofprofileid` (`currentlocofprofileid`),
        CONSTRAINT `location_ibfk_1` FOREIGN KEY (`currentlocofprofileid`) REFERENCES `profile` (`profileid`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `location`

--

LOCK TABLES `location` WRITE;

/*!40000 ALTER TABLE `location` DISABLE KEYS */

;

INSERT INTO `location`
VALUES (6, NULL, NULL, NULL, NULL, NULL, 6), (7, NULL, NULL, NULL, NULL, NULL, 7), (8, NULL, NULL, NULL, NULL, NULL, 8), (9, NULL, NULL, NULL, NULL, NULL, 9);

/*!40000 ALTER TABLE `location` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `message`

--

DROP TABLE IF EXISTS `message`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `message` (
        `senderprofileid` bigint NOT NULL,
        `receiverprofileid` bigint NOT NULL,
        `Message` varchar(400) DEFAULT NULL,
        `messageid` bigint NOT NULL AUTO_INCREMENT,
        `mes_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`messageid`),
        KEY `senderprofileid` (`senderprofileid`),
        KEY `receiverprofileid` (`receiverprofileid`),
        CONSTRAINT `message_ibfk_1` FOREIGN KEY (`senderprofileid`) REFERENCES `profile` (`profileid`),
        CONSTRAINT `message_ibfk_2` FOREIGN KEY (`receiverprofileid`) REFERENCES `profile` (`profileid`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `message`

--

LOCK TABLES `message` WRITE;

/*!40000 ALTER TABLE `message` DISABLE KEYS */

;

INSERT INTO `message`
VALUES (
        7,
        6,
        'hi',
        1,
        '2023-11-19 18:40:22'
    ), (
        6,
        7,
        'hi there hope u r good',
        2,
        '2023-11-19 18:43:14'
    ), (
        6,
        7,
        'then whts up',
        3,
        '2023-11-19 18:48:43'
    ), (
        7,
        6,
        'nothing just working on Big Data project',
        4,
        '2023-11-19 18:49:17'
    ), (
        7,
        6,
        'now we have dbms class',
        5,
        '2023-11-20 06:39:32'
    ), (
        6,
        7,
        'ok',
        6,
        '2023-11-20 06:39:37'
    ), (
        6,
        7,
        'hi',
        7,
        '2023-11-20 07:21:18'
    ), (
        7,
        6,
        'Hey there ',
        8,
        '2023-11-23 11:04:16'
    );

/*!40000 ALTER TABLE `message` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `photo`

--

DROP TABLE IF EXISTS `photo`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `photo` (
        `PhotoId` bigint NOT NULL AUTO_INCREMENT,
        `Caption` varchar(500) DEFAULT NULL,
        `Link` varchar(200) DEFAULT NULL,
        `CreatedTimestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        `postedbyprofileid` bigint DEFAULT NULL,
        PRIMARY KEY (`PhotoId`),
        KEY `postedbyprofileid` (`postedbyprofileid`),
        CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`postedbyprofileid`) REFERENCES `profile` (`profileid`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `photo`

--

LOCK TABLES `photo` WRITE;

/*!40000 ALTER TABLE `photo` DISABLE KEYS */

;

INSERT INTO `photo`
VALUES (
        2,
        'Stable Diffusion',
        'https://res.cloudinary.com/djqrkesfu/image/upload/v1700408955/dpjwat5emvyfbpvkvhwa.png',
        '2023-11-19 15:50:15',
        6
    ), (
        3,
        'God is Great!!!',
        'https://res.cloudinary.com/djqrkesfu/image/upload/v1700462676/sjpbmivlby4fzyzpqfpg.jpg',
        '2023-11-20 06:44:54',
        7
    ), (
        4,
        'Feeling Blessed',
        'https://res.cloudinary.com/djqrkesfu/image/upload/v1700732231/aealwpbfbdzrxrp0rgjg.jpg',
        '2023-11-23 09:37:33',
        9
    );

/*!40000 ALTER TABLE `photo` ENABLE KEYS */

;

UNLOCK TABLES;

/*!50003 SET @saved_cs_client      = @@character_set_client */

;

/*!50003 SET @saved_cs_results     = @@character_set_results */

;

/*!50003 SET @saved_col_connection = @@collation_connection */

;

/*!50003 SET character_set_client  = cp850 */

;

/*!50003 SET character_set_results = cp850 */

;

/*!50003 SET collation_connection  = cp850_general_ci */

;

/*!50003 SET @saved_sql_mode       = @@sql_mode */

;

/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */

;

DELIMITER ;;

CREATE TRIGGER `DELETE_PHOTO_REACTIONS` BEFORE DELETE 
ON `PHOTO` FOR EACH ROW BEGIN DELETE 
	delete from reactions r where r.photoid=old.photoid;
	end ;
	;


DELIMITER ;

/*!50003 SET sql_mode              = @saved_sql_mode */

;

/*!50003 SET character_set_client  = @saved_cs_client */

;

/*!50003 SET character_set_results = @saved_cs_results */

;

/*!50003 SET collation_connection  = @saved_col_connection */

;

--

-- Table structure for table `profile`

--

DROP TABLE IF EXISTS `profile`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `profile` (
        `profileid` bigint NOT NULL,
        `AboutMe` varchar(200) DEFAULT NULL,
        `FirstName` varchar(20) DEFAULT NULL,
        `LastName` varchar(20) DEFAULT NULL,
        `Birthday` date DEFAULT NULL,
        `SchoolCount` int DEFAULT NULL,
        `WorkCount` int DEFAULT NULL,
        `WebProfileLink` varchar(50) DEFAULT NULL,
        `PictureURL` varchar(50) DEFAULT NULL,
        `WebSendMessageLink` varchar(50) DEFAULT NULL,
        `Gender` enum('Male', 'Female', 'Other') DEFAULT NULL,
        PRIMARY KEY (`profileid`),
        CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`profileid`) REFERENCES `user_auth` (`profileid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `profile`

--

LOCK TABLES `profile` WRITE;

/*!40000 ALTER TABLE `profile` DISABLE KEYS */

;

INSERT INTO `profile`
VALUES (
        6,
        NULL,
        'Hemabhushan',
        'R',
        '2003-11-15',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'Male'
    ), (
        7,
        NULL,
        'Nagabhushan',
        'H',
        '2014-07-18',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'Male'
    ), (
        8,
        NULL,
        'Bhargavi',
        'M',
        '2023-11-09',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'Female'
    ), (
        9,
        NULL,
        'Janardhan',
        'K',
        '2020-02-11',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'Male'
    );

/*!40000 ALTER TABLE `profile` ENABLE KEYS */

;

UNLOCK TABLES;

/*!50003 SET @saved_cs_client      = @@character_set_client */

;

/*!50003 SET @saved_cs_results     = @@character_set_results */

;

/*!50003 SET @saved_col_connection = @@collation_connection */

;

/*!50003 SET character_set_client  = cp850 */

;

/*!50003 SET character_set_results = cp850 */

;

/*!50003 SET collation_connection  = cp850_general_ci */

;

/*!50003 SET @saved_sql_mode       = @@sql_mode */

;

/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */

;

DELIMITER ;;

CREATE TRIGGER `ACCOUNT_DELETE` BEFORE DELETE ON `PROFILE` 
FOR EACH ROW BEGIN DELETE 
	delete from location loc
	where
	    loc.currentlocofprofileid = old.profileid;
	delete from profile_interests pi where pi.profileid=old.profileid;
	delete from photo p where p.postedbyprofileid=old.profileid;
	delete from video v where v.postedbyprofileid=old.profileid;
	delete from reactions r where r.reactionbyprofileid=old.profileid;
	delete from userstatus u where u.profileid=old.profileid;
	delete from follower f
	where
	    f.followedprofileid = old.profileid
	    or f.followerprofileid = old.profileid;
	delete from message m
	where
	    m.senderprofileid = old.profileid
	    or m.receiverprofileid = old.profileid;
	end ;
	;


DELIMITER ;

/*!50003 SET sql_mode              = @saved_sql_mode */

;

/*!50003 SET character_set_client  = @saved_cs_client */

;

/*!50003 SET character_set_results = @saved_cs_results */

;

/*!50003 SET collation_connection  = @saved_col_connection */

;

--

-- Table structure for table `profile_interests`

--

DROP TABLE IF EXISTS `profile_interests`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `profile_interests` (
        `profileid` bigint NOT NULL,
        `Interest` varchar(15) NOT NULL,
        PRIMARY KEY (`profileid`, `Interest`),
        CONSTRAINT `profile_interests_ibfk_1` FOREIGN KEY (`profileid`) REFERENCES `profile` (`profileid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `profile_interests`

--

LOCK TABLES `profile_interests` WRITE;

/*!40000 ALTER TABLE `profile_interests` DISABLE KEYS */

;

/*!40000 ALTER TABLE `profile_interests` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `reactions`

--

DROP TABLE IF EXISTS `reactions`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `reactions` (
        `ReactionId` bigint NOT NULL AUTO_INCREMENT,
        `PhotoId` bigint DEFAULT NULL,
        `VideoId` bigint DEFAULT NULL,
        `reactionbyprofileid` bigint DEFAULT NULL,
        `ReactionType` enum(
            'Like',
            'Laugh',
            'Cry',
            'Wow',
            'Angry',
            'Sad'
        ) DEFAULT NULL,
        PRIMARY KEY (`ReactionId`),
        KEY `reactionbyprofileid` (`reactionbyprofileid`),
        KEY `PhotoId` (`PhotoId`),
        KEY `VideoId` (`VideoId`),
        CONSTRAINT `reactions_ibfk_3` FOREIGN KEY (`reactionbyprofileid`) REFERENCES `profile` (`profileid`),
        CONSTRAINT `reactions_ibfk_4` FOREIGN KEY (`PhotoId`) REFERENCES `photo` (`PhotoId`),
        CONSTRAINT `reactions_ibfk_5` FOREIGN KEY (`VideoId`) REFERENCES `video` (`VideoId`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `reactions`

--

LOCK TABLES `reactions` WRITE;

/*!40000 ALTER TABLE `reactions` DISABLE KEYS */

;

INSERT INTO `reactions`
VALUES (1, 2, NULL, 6, 'Like'), (2, 2, NULL, 7, 'Like'), (3, 2, NULL, 7, 'Wow'), (8, 3, NULL, 6, 'Like');

/*!40000 ALTER TABLE `reactions` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `user_auth`

--

DROP TABLE IF EXISTS `user_auth`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `user_auth` (
        `profileid` bigint NOT NULL AUTO_INCREMENT,
        `email` varchar(100) DEFAULT NULL,
        `password` varchar(200) DEFAULT NULL,
        `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`profileid`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `user_auth`

--

LOCK TABLES `user_auth` WRITE;

/*!40000 ALTER TABLE `user_auth` DISABLE KEYS */

;

INSERT INTO `user_auth`
VALUES (
        6,
        'hemabhushanr3@gmail.com',
        '$2b$12$i94/irhZvVl6U.FK7AH1W.cDpK1jLD244Gyv4rm.i9HuCRMb.d/zS',
        '2023-11-19 15:03:40',
        '2023-11-19 15:03:40'
    ), (
        7,
        'nagabhushanr3@gmail.com',
        '$2b$12$VS.xfvqXvFqkNONPm4eKpe3K7zyy3ASpGwo60yqsex/GcaZ6sETNO',
        '2023-11-19 15:59:42',
        '2023-11-19 15:59:42'
    ), (
        8,
        'anything@gmail.com',
        '$2b$12$ozSlV9J4oqAAWF8ae/zR6uG1ANmoBkLPvOgXYuPoOF4y24y3FyPCG',
        '2023-11-20 07:09:20',
        '2023-11-20 07:09:20'
    ), (
        9,
        'janardhan23@gmail.com',
        '$2b$12$lIIy6WhHg4Oz8UXp0acc/OwmHSS9cdkWj.nl/iDOCRlg5tADY4kr2',
        '2023-11-23 09:31:06',
        '2023-11-23 09:31:06'
    );

/*!40000 ALTER TABLE `user_auth` ENABLE KEYS */

;

UNLOCK TABLES;

/*!50003 SET @saved_cs_client      = @@character_set_client */

;

/*!50003 SET @saved_cs_results     = @@character_set_results */

;

/*!50003 SET @saved_col_connection = @@collation_connection */

;

/*!50003 SET character_set_client  = cp850 */

;

/*!50003 SET character_set_results = cp850 */

;

/*!50003 SET collation_connection  = cp850_general_ci */

;

/*!50003 SET @saved_sql_mode       = @@sql_mode */

;

/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */

;

DELIMITER ;;

CREATE TRIGGER `USER_CREATE` AFTER INSERT ON `USER_AUTH` 
FOR EACH ROW BEGIN INSERT 
	insert into profile (profileid) values (new.profileid);
	insert into location (currentlocofprofileid) values (new.profileid);
	end ;


DELIMITER ;

/*!50003 SET sql_mode              = @saved_sql_mode */

;

/*!50003 SET character_set_client  = @saved_cs_client */

;

/*!50003 SET character_set_results = @saved_cs_results */

;

/*!50003 SET collation_connection  = @saved_col_connection */

;

--

-- Table structure for table `userstatus`

--

DROP TABLE IF EXISTS `userstatus`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `userstatus` (
        `profileid` bigint NOT NULL,
        `StatusText` varchar(100) NOT NULL,
        `S_PictureURL` varchar(50) DEFAULT NULL,
        `S_VideoURL` varchar(50) DEFAULT NULL,
        PRIMARY KEY (`profileid`, `StatusText`),
        CONSTRAINT `userstatus_ibfk_1` FOREIGN KEY (`profileid`) REFERENCES `profile` (`profileid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `userstatus`

--

LOCK TABLES `userstatus` WRITE;

/*!40000 ALTER TABLE `userstatus` DISABLE KEYS */

;

/*!40000 ALTER TABLE `userstatus` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `video`

--

DROP TABLE IF EXISTS `video`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `video` (
        `VideoId` bigint NOT NULL AUTO_INCREMENT,
        `Caption` varchar(500) DEFAULT NULL,
        `Link` varchar(50) DEFAULT NULL,
        `CreatedTimestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        `postedbyprofileid` bigint DEFAULT NULL,
        PRIMARY KEY (`VideoId`),
        KEY `postedbyprofileid` (`postedbyprofileid`),
        CONSTRAINT `video_ibfk_1` FOREIGN KEY (`postedbyprofileid`) REFERENCES `profile` (`profileid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `video`

--

LOCK TABLES `video` WRITE;

/*!40000 ALTER TABLE `video` DISABLE KEYS */

;

/*!40000 ALTER TABLE `video` ENABLE KEYS */

;

UNLOCK TABLES;

/*!50003 SET @saved_cs_client      = @@character_set_client */

;

/*!50003 SET @saved_cs_results     = @@character_set_results */

;

/*!50003 SET @saved_col_connection = @@collation_connection */

;

/*!50003 SET character_set_client  = cp850 */

;

/*!50003 SET character_set_results = cp850 */

;

/*!50003 SET collation_connection  = cp850_general_ci */

;

/*!50003 SET @saved_sql_mode       = @@sql_mode */

;

/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */

;

DELIMITER ;;

CREATE TRIGGER `DELETE_VIDEO` BEFORE DELETE ON `VIDEO` 
FOR EACH ROW BEGIN DELETE 
	delete from reactions r where r.videoid=old.videoid;
	end ;
	;


DELIMITER ;

/*!50003 SET sql_mode              = @saved_sql_mode */

;

/*!50003 SET character_set_client  = @saved_cs_client */

;

/*!50003 SET character_set_results = @saved_cs_results */

;

/*!50003 SET collation_connection  = @saved_col_connection */

;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */

;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */

;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */

;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */

;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */

;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */

;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */

;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */

;

SELECT * FROM user_auth WHERE email=? 

SELECT * FROM user_auth WHERE email=? 

INSERT INTO user_auth (email,password) VALUES (?,?) 

UPDATE profile
SET
    firstname = ?,
    lastname = ?,
    birthday = ?,
    gender = ?
WHERE profileid = ?

SELECT *
FROM profile
WHERE profileid = (
        SELECT profileid
        FROM user_auth
        WHERE email = ?
    )

UPDATE profile
SET
    aboutme = ?,
    firstname = ?,
    lastname = ?,
    birthday = ?,
    schoolcount = ?,
    workcount = ?,
    gender = ?
WHERE profileid = (
        SELECT profileid
        FROM user_auth
        WHERE email = ?
    )

SELECT *
FROM photo
WHERE postedbyprofileid IN (
        SELECT
            followedprofileid
        FROM follower
        WHERE
            followerprofileid = (
                SELECT
                    profileid
                FROM
                    user_auth
                WHERE
                    email = ?
            )
    )

SELECT *
FROM video
WHERE postedbyprofileid IN (
        SELECT
            followedprofileid
        FROM follower
        WHERE
            followerprofileid = (
                SELECT
                    profileid
                FROM
                    user_auth
                WHERE
                    email = ?
            )
    )

SELECT *
FROM photo
WHERE postedbyprofileid = (
        SELECT profileid
        FROM user_auth
        WHERE email = ?
    )

SELECT *
FROM video
WHERE postedbyprofileid = (
        SELECT profileid
        FROM user_auth
        WHERE email = ?
    )

SELECT * FROM profile WHERE (firstname like ?) OR (lastname like ?) 

SELECT *
FROM profile
WHERE profileid NOT IN (
        SELECT
            followedprofileid
        FROM follower
        WHERE
            followerprofileid = (
                SELECT
                    profileid
                FROM
                    user_auth
                WHERE
                    email = ?
            )
    )
    AND profileid <> (
        SELECT profileid
        FROM user_auth
        WHERE email = ?
    )

call delete_account( (
            SELECT profileid
            FROM user_auth
            WHERE email = ?
        )
    )

INSERT INTO
    follower (
        followerprofileid,
        followedprofileid
    )
VALUES (?, ?)

DELETE FROM follower
WHERE
    followerprofileid = ?
    and followedprofileid = ?

SELECT total_followers( (
            SELECT profileid
            FROM user_auth
            WHERE email = ?
        )
    ) as followercount

SELECT total_followed( (
            SELECT profileid
            FROM user_auth
            WHERE email = ?
        )
    ) as followedcount

INSERT INTO
    photo (
        caption,
        link,
        postedbyprofileid
    )
VALUES (
        ?, ?, (
            SELECT profileid
            FROM user_auth
            WHERE email = ?
        )
    )

UPDATE photo SET caption = ?, Link = ? WHERE PhotoId = ? 

DELETE FROM photo WHERE PhotoId = ? 

INSERT INTO
    video (
        caption,
        link,
        postedbyprofileid
    )
VALUES (
        ?, ?, (
            SELECT profileid
            FROM user_auth
            WHERE email = ?
        )
    )

UPDATE photo SET caption = ? , Link = ? WHERE VideoId = ? 

DELETE FROM video WHERE VideoId = ? 

INSERT INTO
    reactions (
        photoid,
        reactionbyprofileid,
        reactiontype
    )
VALUES (
        ?, (
            SELECT profileid
            FROM user_auth
            WHERE email = ?
        ), ?
    )

INSERT INTO
    reactions (
        videoid,
        reactionbyprofileid,
        reactiontype
    )
VALUES (
        ?, (
            SELECT profileid
            FROM user_auth
            WHERE email = ?
        ), ?
    )

UPDATE reactions SET reactiontype = ? WHERE reactionid = ? 

DELETE FROM reactions WHERE reactionid = ? 

SELECT total_photo_reactions(?) as reactioncount 

SELECT total_video_reactions(?) as reactioncount 

INSERT INTO
    message (
        senderprofileid,
        receiverprofileid,
        Message
    )
VALUES ( (
            SELECT profileid
            FROM user_auth
            WHERE
                email = ?
        ),
        ?,
        ?
    )

DELETE FROM message WHERE messageid = ? 

SELECT
    distinct m.receiverprofileid,
    m.Message,
    m.mes_timestamp,
    p.FirstName,
    p.LastName
FROM message m
    RIGHT JOIN profile p ON p.profileid = m.receiverprofileid
WHERE m.senderprofileid = (
        SELECT u.profileid
        FROM user_auth u
        WHERE u.email = ?
    )
ORDER BY m.mes_timestamp DESC
SELECT
    m.senderprofileid,
    m.messageid,
    m.Message,
    m.mes_timestamp,
    p.FirstName,
    p.LastName
FROM message m
    INNER JOIN profile p ON p.profileid = m.senderprofileid
WHERE (
        m.senderprofileid = ?
        AND m.receiverprofileid = (
            SELECT profileid
            FROM user_auth u
            WHERE
                u.email = ?
        )
    )
    OR (
        m.senderprofileid = (
            SELECT profileid
            FROM user_auth u
            WHERE
                u.email = ?
        )
        AND m.receiverprofileid = ?
    )
GROUP BY
    m.senderprofileid,
    p.FirstName,
    m.messageid,
    m.Message,
    m.mes_timestamp
ORDER BY m.mes_timestamp -- Dump completed on 2023-11-25  1:30:49