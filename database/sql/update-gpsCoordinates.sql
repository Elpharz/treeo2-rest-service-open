update public."Measurements" m
    set
    gpscoordinates = ST_POINT(
        substring(m."gpsLocation" from '\,(\d*\.\d*)')::double precision,
        substring(m."gpsLocation" from '(\d*.\d*)\ \,(\d*\.\d*)')::double precision)::geography(point)
    where
      m."gpsLocation" ~ '(\d*.\d*)\ \,(\d*\.\d*)';