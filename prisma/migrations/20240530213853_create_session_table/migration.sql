-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(255) NOT NULL PRIMARY KEY, -- Changed TEXT to VARCHAR(255)
    `shop` VARCHAR(255) NOT NULL,            -- Changed TEXT to VARCHAR(255)
    `state` VARCHAR(255) NOT NULL,           -- Changed TEXT to VARCHAR(255)
    `isOnline` BOOLEAN NOT NULL DEFAULT false,
    `scope` VARCHAR(255),                    -- Changed TEXT to VARCHAR(255)
    `expires` DATETIME,
    `accessToken` VARCHAR(255) NOT NULL,     -- Changed TEXT to VARCHAR(255)
    `userId` BIGINT,
    `firstName` VARCHAR(255),                -- Changed TEXT to VARCHAR(255)
    `lastName` VARCHAR(255),                 -- Changed TEXT to VARCHAR(255)
    `email` VARCHAR(255),                   -- Changed TEXT to VARCHAR(255)
    `accountOwner` BOOLEAN NOT NULL DEFAULT false,
    `locale` VARCHAR(255),                   -- Changed TEXT to VARCHAR(255)
    `collaborator` BOOLEAN DEFAULT false,
    `emailVerified` BOOLEAN DEFAULT false
);
