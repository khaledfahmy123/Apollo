'''
An Implementation of the Unscented Kalman Filter Which is a derivative-free instantiation of the bayes filter 
for linear/linearized models and assumed gaussian noise
The UKF is derivative-free in the sense that it does not rely on a taylor expansion of the nonlinear model
rather, it relies of on a stochastic form of linearization and the Unscented Transform
'''
import numpy as np
from propagator import Propagator
 
class UKF():
    def __init__(self):

        self.dim = 6 #Dimensionality of the state vector
        self.mean = None #column vector (dim x 1)
        #self.var = 3 * np.sqrt(0.4) 
        #self.covariance = np.diag([self.var for i in range(self.dim)]) #square matrix (dim x dim)
        self.covariance = 0.0001*np.eye(6)

        self.sigma_points_no = (2 * self.dim) + 1
        self.sigma_points = np.zeros((self.dim, self.sigma_points_no))

        #Hyper-parameters
        self.alpha = 1.003
        self.beta = 2 #2 is optimal if the underlying distribution is indeed a gaussian
        self.kappa = 3
        self.lamda = (self.alpha ** 2) * (int(self.dim/2) + self.kappa) - int(self.dim/2)

        #Calculating weights
        self.weights_m = np.zeros(self.sigma_points_no) #used when computing the mean (1 x no. of sigma points)
        self.weights_c = np.zeros(self.sigma_points_no) #used when recovering the covariance of the gaussian (1 x no. of sigma points)
        self.calc_weights()

        #sensor measurment
        self.sensor_measurment = None

    def calc_sigma_points(self, mean):
        t = self.sigma_points.T #transpose of the sigma points matrix
        '''
        evaluating the square-root of the covariance matrix
        The covariance matrix is always both symmetric and positive semi- definite
        Therefore the Cholesky decomposition is used
        '''
        L = np.linalg.cholesky((int(self.dim/2) + self.lamda) * self.covariance)
        #Evaluating Sigma-points
        t[0] = mean.T

        for i in range(self.dim):
            t[i+1] = mean.T + L[i]
            t[self.dim + 1 + i] = mean.T - L[i]

        self.sigma_points = t.T

    def calc_weights(self):
        self.weights_m[0] = self.lamda / (int(self.dim/2) + self.lamda)
        self.weights_c[0] = (self.lamda / (int(self.dim/2) + self.lamda)) + (1 - (self.alpha ** 2) + self.beta)
        counter = 1
        while counter < self.sigma_points_no:
            self.weights_m[counter] = 1 / (2 * (int(self.dim/2) + self.lamda))
            self.weights_c[counter] = 1 / (2 * (int(self.dim/2) + self.lamda))
            counter += 1

    '''
    The covariance of the process and observation noise is assumed to diagonal and time-invariant
    they will be manually tuned but will be wrapped up in functions in case we need to provide a proper calculation 
    '''
    def Q_matrix(self):
        var = 0.1
        return np.diag([var for i in range(self.dim)])

    def R_matrix(self):
        var = 0.9
        return np.diag([var for i in range(self.dim)])

    def main(self):
        predicted_mean = self.mean
        predicted_covariance = self.covariance
        #update
        self.calc_sigma_points(predicted_mean)
        '''
        our sensor output needs no state transition matrix to map from position to measurment space
        therefore the Z matrix is the same as the X (sigma points) matrix, alternatively, the Z matrix is identity
        but we will define a rudundant varibale for the tranformed sigma points in case the state transition matrix changed
        '''
        meas_sig_pts = self.sigma_points #propagate sigma points through the state transition matrix of the observation model

        #calculating the mean in measurment space
        meas_mean_t = np.zeros((1,self.dim))
        t = meas_sig_pts.T
        for i in range(self.sigma_points_no):
            meas_mean_t += self.weights_m[i] * t[i].reshape(1,6)

        meas_mean = meas_mean_t.T #(dim x 1)

        #calculating the covariance in measurment space
        meas_cov = np.zeros((self.dim,self.dim))
        for i in range(self.sigma_points_no):
            mean_sub_pts = t[i].reshape(1,6) - meas_mean_t 
            meas_cov += self.weights_c[i] * (mean_sub_pts.T @ mean_sub_pts)
            
        Q = self.Q_matrix()
        meas_cov += Q
        
        #Cross Co-relation Matrix between state space and predicted space
        cross_cor = np.zeros((self.dim,self.dim))
        predicted_mean_t = predicted_mean.T
        t2 = self.sigma_points.T
        for i in range(self.sigma_points_no):
            mean_sub_pts = t[i].reshape(1,6) - meas_mean_t
            mean_sub_pts_2 = t2[i].reshape(1,6) - predicted_mean_t
            cross_cor += self.weights_c[i] * (mean_sub_pts_2.T @ mean_sub_pts)

        #calculating Kalman Gain
        kalman_gain = cross_cor @ (np.linalg.inv(meas_cov))
        self.mean = predicted_mean + kalman_gain @ (self.sensor_measurment - meas_mean)
        self.covariance = predicted_covariance - (kalman_gain @ meas_cov @ kalman_gain.T)

        return self.mean, self.covariance