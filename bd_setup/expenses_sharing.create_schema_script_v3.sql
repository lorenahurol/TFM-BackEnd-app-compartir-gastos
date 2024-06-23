-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema expenses_sharing
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema expenses_sharing
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `expenses_sharing` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `expenses_sharing` ;

-- -----------------------------------------------------
-- Table `expenses_sharing`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `expenses_sharing`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `mail` VARCHAR(60) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(80) NOT NULL,
  `firstname` VARCHAR(45) NULL,
  `lastname` VARCHAR(65) NULL,
  `phone` VARCHAR(20) NULL,
  `image` VARCHAR(100) NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `expenses_sharing`.`group_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `expenses_sharing`.`group_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `expenses_sharing`.`groups_app`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `expenses_sharing`.`groups_app` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `creator_user_id` INT UNSIGNED NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_groups_users_idx` (`creator_user_id` ASC) INVISIBLE,
  INDEX `fk_groups_categories_group_idx` (`category_id` ASC) INVISIBLE,
  CONSTRAINT `fk_groups_users`
    FOREIGN KEY (`creator_user_id`)
    REFERENCES `expenses_sharing`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_groups_categories_group`
    FOREIGN KEY (`category_id`)
    REFERENCES `expenses_sharing`.`group_categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `expenses_sharing`.`invitations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `expenses_sharing`.`invitations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  `group_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `accepted` TINYINT NOT NULL DEFAULT 0,
  `active` TINYINT NOT NULL DEFAULT 1,
  `message` TEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_invitations_groups_idx` (`group_id` ASC) INVISIBLE,
  INDEX `fk_invitations_users_idx` (`user_id` ASC) INVISIBLE,
  CONSTRAINT `fk_invitations_groups`
    FOREIGN KEY (`group_id`)
    REFERENCES `expenses_sharing`.`groups_app` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invitations_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `expenses_sharing`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `expenses_sharing`.`expenses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `expenses_sharing`.`expenses` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `group_id` INT UNSIGNED NOT NULL,
  `description` VARCHAR(80) NOT NULL,
  `amount` DOUBLE NOT NULL,
  `date` DATETIME NOT NULL,
  `payer_user_id` INT UNSIGNED NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_expenses_groups_idx` (`group_id` ASC) VISIBLE,
  INDEX `fk_expenses_users_idx` (`payer_user_id` ASC) INVISIBLE,
  CONSTRAINT `fk_expenses_groups`
    FOREIGN KEY (`group_id`)
    REFERENCES `expenses_sharing`.`groups_app` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_expenses_users`
    FOREIGN KEY (`payer_user_id`)
    REFERENCES `expenses_sharing`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `expenses_sharing`.`group_members`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `expenses_sharing`.`group_members` (
  `group_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `percent` DOUBLE NOT NULL,
  `equitable` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`group_id`, `user_id`),
  INDEX `fk_group_members_users_idx` (`user_id` ASC) INVISIBLE,
  INDEX `fk_group_members_groups_idx` (`group_id` ASC) INVISIBLE,
  CONSTRAINT `fk_group_members_users`
    FOREIGN KEY (`group_id`)
    REFERENCES `expenses_sharing`.`groups_app` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_members_groups`
    FOREIGN KEY (`user_id`)
    REFERENCES `expenses_sharing`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `expenses_sharing`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `expenses_sharing`.`messages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `message` TEXT NOT NULL,
  `group_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_messages_users_group_idx` (`group_id` ASC, `user_id` ASC) INVISIBLE,
  CONSTRAINT `fk_messages_users_group`
    FOREIGN KEY (`group_id` , `user_id`)
    REFERENCES `expenses_sharing`.`group_members` (`group_id` , `user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `expenses_sharing`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `expenses_sharing`.`payments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `groups_id` INT UNSIGNED NOT NULL,
  `users_id` INT UNSIGNED NOT NULL,
  `amount` DOUBLE NOT NULL,
  `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`, `groups_id`, `users_id`),
  INDEX `fk_payments_groups1_idx` (`groups_id` ASC) VISIBLE,
  INDEX `fk_payments_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_payments_groups1`
    FOREIGN KEY (`groups_id`)
    REFERENCES `expenses_sharing`.`groups_app` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payments_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `expenses_sharing`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;