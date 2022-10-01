from propagator import Propagator
from reader import *
from ukf import UKF
import numpy as np

#provides tracking of the ISS for a week ago and ahead
#19/9/22 - 3/10/22
#28/9/22 - 13/10/22

#getting initial state vector from file
idx , init_r, init_v = get_coords_now(3)
dt = 1
t = dt
#initializing propagator
p = Propagator(init_r,init_v)
r, v = p.Compute_keplers(t)
initial_mean = np.concatenate((r, v)).reshape(6,1)

#initializing UKF
kf = UKF()
kf.mean = initial_mean
while True:
    t += dt
    if t%240 == 0: #checks if 4 minutes has passed

        idx += 1
        r, v = get_by_idx(3, idx)
        state_vector_s = np.concatenate((r, v)).reshape(6,1)
        kf.sensor_measurment = state_vector_s
        mean, _ = kf.main() #return mean and covariance but covariance is not needed here
        print("sensor")
        print(state_vector_s) #prints sensor reading
        print("filtered estimate")
        print(mean) #print filtered state vector
        #place holder for JSON Interfacing shit
    
    else:

        r, v = p.Compute_keplers(t)
        state_vector_m = np.concatenate((r, v)).reshape(6,1) #state vector using only motion model
        kf.mean = state_vector_m
        print("propagator")
        print(state_vector_m)
        #place holder for JSON Interfacing shit

    
