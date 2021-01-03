-- create user/role
CREATE ROLE user_dev WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  NOREPLICATION
  ENCRYPTED PASSWORD 'password';

--- create database
CREATE DATABASE songkick
    WITH 
    OWNER = user_dev
    ENCODING = 'UTF8'
;
--connect to songkick db
\c songkick
-- create extension Postgis
CREATE EXTENSION IF NOT EXISTS Postgis;

-- Table bands
CREATE TABLE public.bands
(
    id integer NOT NULL,
    name character(255) NOT NULL,
    CONSTRAINT bands_pkey PRIMARY KEY (id)
);
ALTER TABLE public.bands
    OWNER to user_dev;

--- Table venues
CREATE TABLE public.venues
(
    id integer NOT NULL,
    name character(255) NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    location geography,
    CONSTRAINT venues_pkey PRIMARY KEY (id)
);
ALTER TABLE public.venues
    OWNER to user_dev;

CREATE INDEX idx_venues_location
    ON venues USING gist(location);

CREATE INDEX idx_venues_latitue_longitude
    ON venues USING btree
    (latitude ASC NULLS LAST, longitude ASC NULLS LAST);

--- Partion Table concerts
CREATE TABLE public.concerts
(
    "bandId" integer NOT NULL,
    "venueId" integer NOT NULL,
    date timestamp without time zone NOT NULL,
    CONSTRAINT concerts_pkey PRIMARY KEY ("bandId", "venueId", date),
    CONSTRAINT fk_concert_band FOREIGN KEY ("bandId")
        REFERENCES public.bands (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_concert_venue FOREIGN KEY ("venueId")
        REFERENCES public.venues (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) PARTITION BY RANGE (date);

ALTER TABLE public.concerts OWNER to user_dev;

-- Partitions SQL
CREATE TABLE public.concerts_2010 PARTITION OF public.concerts
    FOR VALUES FROM ('2010-01-01 00:00:00') TO ('2010-12-31 00:00:00');

ALTER TABLE public.concerts_2010 OWNER to user_dev;

CREATE TABLE public.concerts_2011 PARTITION OF public.concerts
    FOR VALUES FROM ('2011-01-01 00:00:00') TO ('2011-12-31 00:00:00');

ALTER TABLE public.concerts_2011 OWNER to user_dev;

CREATE TABLE public.concerts_2012 PARTITION OF public.concerts
    FOR VALUES FROM ('2012-01-01 00:00:00') TO ('2012-12-31 00:00:00');

ALTER TABLE public.concerts_2012 OWNER to user_dev;

CREATE TABLE public.concerts_2013 PARTITION OF public.concerts
    FOR VALUES FROM ('2013-01-01 00:00:00') TO ('2013-12-31 00:00:00');

ALTER TABLE public.concerts_2013 OWNER to user_dev;

CREATE TABLE public.concerts_2014 PARTITION OF public.concerts
    FOR VALUES FROM ('2014-01-01 00:00:00') TO ('2014-12-31 00:00:00');

ALTER TABLE public.concerts_2014 OWNER to user_dev;

CREATE TABLE public.concerts_2015 PARTITION OF public.concerts
    FOR VALUES FROM ('2015-01-01 00:00:00') TO ('2015-12-31 00:00:00');

ALTER TABLE public.concerts_2015 OWNER to user_dev;

CREATE TABLE public.concerts_2016 PARTITION OF public.concerts
    FOR VALUES FROM ('2016-01-01 00:00:00') TO ('2016-12-31 00:00:00');

ALTER TABLE public.concerts_2016 OWNER to user_dev;

CREATE TABLE public.concerts_2017 PARTITION OF public.concerts
    FOR VALUES FROM ('2017-01-01 00:00:00') TO ('2017-12-31 00:00:00');

ALTER TABLE public.concerts_2017 OWNER to user_dev;

CREATE TABLE public.concerts_2018 PARTITION OF public.concerts
    FOR VALUES FROM ('2018-01-01 00:00:00') TO ('2018-12-31 00:00:00');

ALTER TABLE public.concerts_2018 OWNER to user_dev;

CREATE TABLE public.concerts_2019 PARTITION OF public.concerts
    FOR VALUES FROM ('2019-01-01 00:00:00') TO ('2019-12-31 00:00:00');

ALTER TABLE public.concerts_2019 OWNER to user_dev;

CREATE TABLE public.concerts_default PARTITION OF public.concerts DEFAULT;

ALTER TABLE public.concerts_default OWNER to user_dev;