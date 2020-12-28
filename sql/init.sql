CREATE ROLE user_dev WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  NOREPLICATION
  ENCRYPTED PASSWORD 'md5cc24fb564b2b0f595c5cc9e1a610a205';
  
CREATE DATABASE songkick
    WITH 
    OWNER = user_dev
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE public.bands
(
    id integer NOT NULL DEFAULT nextval('bands_id_seq'::regclass),
    name character(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT bands_pkey PRIMARY KEY (id)
)


ALTER TABLE public.bands
    OWNER to user_dev;

CREATE TABLE public.venues
(
    id integer NOT NULL,
    name character(255) COLLATE pg_catalog."default" NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    CONSTRAINT venues_pkey PRIMARY KEY (id)
)


ALTER TABLE public.venues
    OWNER to user_dev;

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

ALTER TABLE public.concerts
    OWNER to user_dev;

-- Partitions SQL

CREATE TABLE public.concerts_2010 PARTITION OF public.concerts
    FOR VALUES FROM ('2010-01-01 00:00:00') TO ('2010-12-31 00:00:00');

ALTER TABLE public.concerts_2010
    OWNER to postgres;

CREATE TABLE public.concerts_2011 PARTITION OF public.concerts
    FOR VALUES FROM ('2011-01-01 00:00:00') TO ('2011-12-31 00:00:00');

ALTER TABLE public.concerts_2011
    OWNER to postgres;

CREATE TABLE public.concerts_2012 PARTITION OF public.concerts
    FOR VALUES FROM ('2012-01-01 00:00:00') TO ('2012-12-31 00:00:00');

ALTER TABLE public.concerts_2012
    OWNER to postgres;

CREATE TABLE public.concerts_2013 PARTITION OF public.concerts
    FOR VALUES FROM ('2013-01-01 00:00:00') TO ('2013-12-31 00:00:00');

ALTER TABLE public.concerts_2013
    OWNER to postgres;

CREATE TABLE public.concerts_2014 PARTITION OF public.concerts
    FOR VALUES FROM ('2014-01-01 00:00:00') TO ('2014-12-31 00:00:00');

ALTER TABLE public.concerts_2014
    OWNER to postgres;

CREATE TABLE public.concerts_2015 PARTITION OF public.concerts
    FOR VALUES FROM ('2015-01-01 00:00:00') TO ('2015-12-31 00:00:00');

ALTER TABLE public.concerts_2015
    OWNER to postgres;

CREATE TABLE public.concerts_2016 PARTITION OF public.concerts
    FOR VALUES FROM ('2016-01-01 00:00:00') TO ('2016-12-31 00:00:00');

ALTER TABLE public.concerts_2016
    OWNER to postgres;

CREATE TABLE public.concerts_2017 PARTITION OF public.concerts
    FOR VALUES FROM ('2017-01-01 00:00:00') TO ('2017-12-31 00:00:00');

ALTER TABLE public.concerts_2017
    OWNER to postgres;

CREATE TABLE public.concerts_2018 PARTITION OF public.concerts
    FOR VALUES FROM ('2018-01-01 00:00:00') TO ('2018-12-31 00:00:00');

ALTER TABLE public.concerts_2018
    OWNER to postgres;

CREATE TABLE public.concerts_default PARTITION OF public.concerts
    DEFAULT;

ALTER TABLE public.concerts_default
    OWNER to postgres;