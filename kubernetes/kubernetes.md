# Kubernetes Setup Guide for MedView Project

This guide will help you quickly set up a local Kubernetes cluster with **k3d**, configure ingress, and deploy your MedView application.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed and running  
- [k3d](https://k3d.io/) installed  
- [kubectl](https://kubernetes.io/docs/tasks/tools/) installed  

---

## Setup Steps

1. **Create the k3d cluster** with ports 80 and 443 forwarded to the cluster load balancer:

    ```bash
    k3d cluster create medview-cluster --port "80:80@loadbalancer" --port "443:443@loadbalancer"
    ```

2. **Update your hosts file** to map `medview.local` to localhost:  
   - Open Command Prompt **as Administrator**  
   - Run:

    ```cmd
    notepad C:\Windows\System32\drivers\etc\hosts
    ```

   - Add the following line at the end of the file:

    ```
    127.0.0.1 medview.local
    ```

   - Save and close the file.

3. **Deploy the NGINX Ingress Controller**:

    ```bash
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
    ```

4. **Wait for ingress-nginx pods to be ready**:

    ```bash
    kubectl get pods -n ingress-nginx -w
    ```

5. **Deploy your MedView application** from `main.yml`:

    ```bash
    kubectl apply -f main.yml
    ```

6. **Watch your application pods in the `medview` namespace**:

    ```bash
    kubectl get pods -n medview -w
    ```

7. **Verify ingress resources**:

    ```bash
    kubectl get ingress -n medview
    kubectl describe ingress medview-ingress -n medview
    ```

8. **Access the application** in your browser:

    ```
    http://medview.local
    ```

---

## Additional Notes

- Ensure your `main.yml` includes the `medview` namespace and properly defines deployments, services, and ingress.  
- If you need to delete the cluster:

    ```bash
    k3d cluster delete medview-cluster
    ```
